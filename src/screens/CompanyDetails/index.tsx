import React, { useState, useEffect } from 'react';
import { Platform, TouchableOpacity, ScrollView, Alert, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { CompanyNavigationProps } from '@src/@types/navigation';

import { useAuth } from '@hooks/auth';

import { COMPANY_TYPES } from '../../utils/companyTypes';
import { RadioButton } from '@components/RadioButton';


import { ButtonBack } from '@components/ButtonBack';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Photo } from '@components/Photo';
import { CompanyProps } from '@components/CompanyCard';

import { 
  Container, 
  Header, 
  Title, 
  DeleteLabel, 
  Upload, 
  PickImageButton,
  Form,
  Label,
  InputGroup,
  Name,
  Description,
  Industry,
  Categories,
} from './styles';

type CompanyResponse = CompanyProps & {
  photo_path: string;
  category: string;
}

export function CompanyDetails() {
  const [category, setCategory] = useState('');

  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState("");
  const [photoPath, setPhotoPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as CompanyNavigationProps;

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (id && !result.cancelled) {
        setNewImage(result.uri);
      }

      if (!result.cancelled) {

        if (!id) {
          setImage(result.uri);
        } else {
          setNewImage(result.uri);
        }
      }
    }
  }

  async function handleAdd() {
    if(!name.trim()) {
      return Alert.alert('Registration', 'Enter the name of the company.')
    }
    if(!category) {
      return Alert.alert('Registration', 'Enter the name of the category.')
    }
    if(!image) {
      return Alert.alert('Registration', 'Select the company image.')
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const fileExtension = image.match(/\.(?:.(?!\.))+$/);
    const reference = storage().ref(
      `/companies/${fileName}.${fileExtension}`,
    );

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection('companies')
      .add({
        category,
        name,
        name_insensitive: name.toLowerCase().trim(),
        industry,
        description,
        photo_url,
        photo_path: reference.fullPath
      })
      .then(() => navigation.navigate('company'))
      .catch(() => {
        Alert.alert('Registration', 'Unable to register the company.')
        setIsLoading(false);
    })
  }  

  async function handleUpdate() {
    if(!name.trim()) {
      return Alert.alert('Update', 'Enter the name of the company.')
    }
    if(!category) {
      return Alert.alert('Registration', 'Enter the name of the category.')
    }
    if(!image) {
      return Alert.alert('Update', 'Select the company image.')
    }

    setIsLoading(true);

    let data: any = {
      category,
      name,
      name_insensitive: name.toLowerCase().trim(),
      industry,
      description,
    }

    if (newImage !== '') {
      await deletePhoto();

      const fileName = new Date().getTime();
      const fileExtension = image.match(/\.(?:.(?!\.))+$/);
      const reference = storage().ref(
        `/companies/${fileName}.${fileExtension}`,
      );

      await reference.putFile(newImage);
      const photo_url = await reference.getDownloadURL();

      data = {
        ...data,
        photo_url,
        photo_path: reference.fullPath
      }
    }
    
    firestore()
      .collection('companies')
      .doc(id)
      .update(data)
      .then(() => navigation.navigate('company'))
      .catch(() => {
        setIsLoading(false);
        Alert.alert('Update', 'Unable to update a company.')
    })

  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert('Delete', `Do you want to delete the company ${name}?`, [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          firestore()
            .collection('companies')
            .doc(id)
            .delete()
            .then(() => {
              storage()
                .ref(photoPath)
                .delete()
                .then(() => navigation.navigate('company'))
            });
        },
      },
    ])
  }

  async function deletePhoto() {
    storage()
    .ref(photoPath)
    .delete();
  }

  useEffect(() => {
    if(id) {
      firestore()
        .collection('companies')
        .doc(id)
        .get()
        .then(response => {
          const company = response.data() as CompanyResponse;

          setCategory(company.category);
          setName(company.name);
          setIndustry(company.industry);
          setDescription(company.description);
          setImage(company.photo_url);
          setPhotoPath(company.photo_path);
        })
    }
  }, [id]);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {user?.isAdmin ? (
        <ScrollView showsVerticalScrollIndicator={false}>
        
        <Header>
          <ButtonBack onPress={handleGoBack} />
          <Title>{!id ? 'Register' : 'Update'}</Title>
          {
          user?.isAdmin && id ?
            <TouchableOpacity onPress={handleDelete}>
            <DeleteLabel>Delete</DeleteLabel>
          </TouchableOpacity>
          : <View style={{ width: 20 }} />
          }
        </Header>

        <Upload>
          <Photo uri={newImage === '' ? image : newImage} />
          <PickImageButton
            title={id ? "Update": "Upload"}
            type="secondary"
            onPress={() => {
              handlePickerImage();
            }}
          />
        </Upload>

        <Form>

          <InputGroup>
            <Label>Name</Label>
            <Input value={name} onChangeText={setName} />
          </InputGroup>

          <Label>Selecione uma categoria: {category}</Label>
          <Categories>
            { 
              COMPANY_TYPES.map(item => (
                <RadioButton
                  key={item.id}
                  title={item.name}
                  onPress={() => setCategory(item.id)}
                  selected={category === item.id}
                />
              ))
            }
          </Categories>

          <InputGroup>
            <Label>Industry/Categories</Label>
            <Input value={industry} onChangeText={setIndustry} />
          </InputGroup>

          <InputGroup>
            <Label>Description</Label>
            <Input
              multiline
              textAlignVertical="top"
              maxLength={4000}
              style={{ height: 120 }}
              onChangeText={(text) => {
                setDescription(text)
              }}
              value={description}
            />
          </InputGroup>

          {
            <Button
              title={!id ? "Register Company" : 'Update Company'}
              isLoading={isLoading}
              onPress={!id ? handleAdd : handleUpdate}
            />
          }
          

        </Form>
      </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header>
            <ButtonBack onPress={handleGoBack}  style={{ marginBottom: 108 }} />
          </Header>
          <Upload style={{ top: -120, flexDirection: 'column'}}>
            <Photo uri={newImage === '' ? image : newImage} />
            <InputGroup>
              {name && <Name>{name}</Name>}
              {industry && <Industry>{industry}</Industry>}
              {description && <Description>{description}</Description>}
            </InputGroup>
          </Upload>
      </ScrollView>
      )}
    </Container>
  );
}