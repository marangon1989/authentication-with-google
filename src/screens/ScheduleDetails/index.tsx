import 
  React, 
  { 
    useState, 
    useEffect 
  } from 'react';
import { 
  Platform, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  View, 
  Text 
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { 
  useRoute, 
  useNavigation 
} from '@react-navigation/native';

import { 
  ScheduleNavigationProps 
} from '@src/@types/navigation';

import DatePicker from 'react-native-modern-datepicker';

import { useAuth } from '@hooks/auth';

import { ButtonBack } from '@components/ButtonBack';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Photo } from '@components/Photo';
import { ScheduleProps } from '@components/ScheduleCard';

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

type ScheduleResponse = ScheduleProps & {
  photo_path: string;
}

export function ScheduleDetails() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionLength, setDescriptionLength] = useState('0');
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState("");
  const [photoPath, setPhotoPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [time, setTime] = useState('');


  const { user } = useAuth();
  
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as ScheduleNavigationProps;

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
      return Alert.alert('Registration', 'Enter the name of the schedule.')
    }
    if(!time) {
      return Alert.alert('Registration', 'Provide a time of the schedule.')
    }
    if(!image) {
      return Alert.alert('Registration', 'Select the schedule image.')
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const fileExtension = image.match(/\.(?:.(?!\.))+$/);
    const reference = storage().ref(
      `/schedules/${fileName}.${fileExtension}`,
    );

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection('schedules')
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        time,
        description,
        photo_url,
        photo_path: reference.fullPath
      })
      .then(() => navigation.navigate('schedule'))
      .catch(() => {
        Alert.alert('Registration', 'Unable to register the schedule.')
        setIsLoading(false);
    })
  }  

  async function handleUpdate() {
    if(!name.trim()) {
      return Alert.alert('Update', 'Enter the name of the schedule.')
    }
    if(!time) {
      return Alert.alert('Registration', 'Provide a time of the schedule.')
    }
    if(!image) {
      return Alert.alert('Update', 'Select the schedule image.')
    }

    setIsLoading(true);

    let data: any = {
      name,
      name_insensitive: name.toLowerCase().trim(),
      time,
      description,
    }

    if (newImage !== '') {
      await deletePhoto();

      const fileName = new Date().getTime();
      const fileExtension = image.match(/\.(?:.(?!\.))+$/);
      const reference = storage().ref(
        `/schedules/${fileName}.${fileExtension}`,
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
      .collection('schedules')
      .doc(id)
      .update(data)
      .then(() => navigation.navigate('schedule'))
      .catch(() => {
        setIsLoading(false);
        Alert.alert('Update', 'Unable to update a schedule.')
    })

  }

  function handleGoBack() {
    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert('Delete', `Do you want to delete the schedule ${name}?`, [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          firestore()
            .collection('schedules')
            .doc(id)
            .delete()
            .then(() => {
              storage()
                .ref(photoPath)
                .delete()
                .then(() => navigation.navigate('schedule'))
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
        .collection('schedules')
        .doc(id)
        .get()
        .then(response => {
          const schedule = response.data() as ScheduleResponse;
          setName(schedule.name);
          setTime(schedule.time);
          setDescription(schedule.description);
          setImage(schedule.photo_url);
          setPhotoPath(schedule.photo_path);
          setDescriptionLength(String(schedule.description.length))
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
          <Photo 
            uri={newImage === '' ? image : newImage}
            />
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

          <DatePicker
            mode="time"
            minuteInterval={5}
            onTimeChange={selectedTime => setTime(selectedTime)}
          />

          <Text>{time}</Text>

          <InputGroup>
            <InputGroupHeader>
              <Label>Description</Label>
              <MaxCharacters>{descriptionLength} of 4000 characters</MaxCharacters>
            </InputGroupHeader>
            <Input
              multiline
              textAlignVertical="top"
              maxLength={4000}
              style={{ height: 120 }}
              onChangeText={(text) => {
                setDescription(text)
                setDescriptionLength(String(text.length))
              }}
              value={description}
            />
          </InputGroup>

          {
            <Button
              title={!id ? "Register Schedule" : 'Update Schedule'}
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
              {time && <Text>{time}</Text>}
              {description && <Description>{description}</Description>}
            </InputGroup>
          </Upload>
      </ScrollView>
      )}
    </Container>
  );
}