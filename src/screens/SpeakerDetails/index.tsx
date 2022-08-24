import React, { useState, useEffect } from 'react';
import { Platform, TouchableOpacity, ScrollView, Alert, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SpeakerNavigationProps } from '@src/@types/navigation';

import { useAuth } from '@hooks/auth';

import { ButtonBack } from '@components/ButtonBack';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Photo } from '@components/Photo';
import { SpeakerProps } from '@components/SpeakerCard';

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
  InputGroupHeader,
  MaxCharacters,
  Name,
  JobTitle,
  Description,
  Website
} from './styles';

type SpeakerResponse = SpeakerProps & {
  photo_path: string;
}

export function SpeakerDetails() {
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState("");
  const [photoPath, setPhotoPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as SpeakerNavigationProps;

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
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
      return Alert.alert('Registration', 'Enter the name of the speaker.')
    }
    if(!jobTitle.trim()) {
      return Alert.alert('Registration', 'Enter a speaker position.')
    }
    if(!image) {
      return Alert.alert('Registration', 'Select the speaker image.')
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const fileExtension = image.match(/\.(?:.(?!\.))+$/);
    const reference = storage().ref(
      `/speakers/${fileName}.${fileExtension}`,
    );

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection('speakers')
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        job_title: jobTitle,
        description,
        photo_url,
        photo_path: reference.fullPath
      })
      .then(() => navigation.navigate('speaker'))
      .catch(() => {
        setIsLoading(false);
        Alert.alert('Registration', 'Unable to register the speaker.')
    })
  }  

  async function handleUpdate() {
    if(!name.trim()) {
      return Alert.alert('Update', 'Enter the name of the speaker.')
    }
    if(!jobTitle.trim()) {
      return Alert.alert('Update', 'Enter a speaker position.')
    }
    if(!image) {
      return Alert.alert('Update', 'Select the speaker image.')
    }

    setIsLoading(true);

    let data: any = {
      name,
      name_insensitive: name.toLowerCase().trim(),
      job_title: jobTitle,
      description,
    }

    if (newImage !== '') {
      await deletePhoto();

      const fileName = new Date().getTime();
      const fileExtension = image.match(/\.(?:.(?!\.))+$/);
      const reference = storage().ref(
        `/speakers/${fileName}.${fileExtension}`,
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
      .collection('speakers')
      .doc(id)
      .update(data)
      .then(() => navigation.navigate('speaker'))
      .catch(() => {
        setIsLoading(false);
        Alert.alert('Update', 'Unable to update a speaker.')
    })
    .catch(() => {
      setIsLoading(false);
      Alert.alert('Registration', 'Unable to register the speaker.')
  })

  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert('Delete', `Do you want to delete the speaker ${name}?`, [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          firestore()
            .collection('speakers')
            .doc(id)
            .delete()
            .then(() => {
              storage()
                .ref(photoPath)
                .delete()
                .then(() => navigation.navigate('speaker'))
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
        .collection('speakers')
        .doc(id)
        .get()
        .then(response => {
          const speaker = response.data() as SpeakerResponse;

          setName(speaker.name);
          setJobTitle(speaker.job_title);
          setDescription(speaker.description);
          setImage(speaker.photo_url);
          setPhotoPath(speaker.photo_path);
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

          <InputGroup>
            <Label>Job Title</Label>
            <Input value={jobTitle} onChangeText={setJobTitle} />
          </InputGroup>

          <InputGroup>
            <Label>Description</Label>
            <Input
              multiline
              textAlignVertical="top"
              style={{ height: 120 }}
              onChangeText={(text) => {
                setDescription(text)
              }}
              value={description}
            />
          </InputGroup>

          {
            !id ?
              (
              <Button
                title="Register Speaker"
                isLoading={isLoading}
                onPress={handleAdd}
              />
              ) : (
              <Button
                title="Update Speaker"
                isLoading={isLoading}
                onPress={handleUpdate}
              />
            )
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
              {jobTitle && <JobTitle>{jobTitle}</JobTitle>}
              {description && <Description>{description}</Description>}
            </InputGroup>
          </Upload>
      </ScrollView>
      )}
    </Container>
  );
}