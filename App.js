import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
} from 'react-native';
import Title from './components/title/title';
import style from './style/main';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import UserStory from './components/userStory/userStory';
import UserPost from './components/userPosts/UserPost';

const App = () => {
  //All of the items in our stories
  const data = [
    {
      firstName: 'Joseph',
      id: 1,
    },
    {
      firstName: 'Angel',
      id: 2,
    },
    {
      firstName: 'White',
      id: 3,
    },
    {
      firstName: 'Olivier',
      id: 4,
    },
    {
      firstName: 'Nata',
      id: 5,
    },
    {
      firstName: 'Adam',
      id: 6,
    },
    {
      firstName: 'Sean',
      id: 7,
    },
    {
      firstName: 'Nicolas',
      id: 8,
    },
    {
      firstName: 'Frederic',
      id: 9,
    },
  ];

  const posts = [
    {
      firstName: 'Allison',
      lastName: 'Becker',
      location: 'Sukabumi, Jawa Barat',
      likes: 1201,
      comments: 24,
      bookmarks: 55,
      id: 1,
    },
    {
      firstName: 'Jennifer',
      lastName: 'Wilkson',
      location: 'Pondok Leungsir, Jawa Barat',
      likes: 570,
      comments: 12,
      bookmarks: 60,
      id: 2,
    },
    {
      firstName: 'Adam',
      lastName: 'Spera',
      location: 'Boston, Massachusetts',
      likes: 100,
      comments: 8,
      bookmarks: 7,
      id: 3,
    },
    {
      firstName: 'Nata',
      lastName: 'Vacheishvili',
      location: 'New York, New York',
      likes: 300,
      comments: 18,
      bookmarks: 17,
      id: 4,
    },
    {
      firstName: 'Nicolas',
      lastName: 'Namoradze',
      location: 'Berlin, Germany',
      likes: 1240,
      comments: 56,
      bookmarks: 20,
      id: 5,
    },
  ];

  // Define page size constant for the number of items to be displayed per page
  const pageSize = 4;
  const pageSizePosts = 2;

  // Define state variable for the current page number
  // so that we know how many pages we have fetched already
  const [pageNumber, setPageNumber] = useState(1);
  const [postPageNumber, setPostPageNumber] = useState(1);

  // Define state variable for the loading status of the flatlist,
  // will be used when we'll be fetching data on scroll until we complete the fetch
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  // Define state variable for the data to be rendered on the page
  const [renderedData, setRenderedData] = useState(data.slice(1, pageSize));

  // Define state variable for the data to be rendered in the user posts container
  //@TODO This should be pageSizePosts, I forgot to mention it in this particular lesson
  //we'll fix that in the upcoming lessons
  const [renderedDataPosts, setRenderedDataPosts] = useState(
    posts.slice(0, pageSize),
  );

  /**
   * function that returns the data for the page to be fetched
   * @param data - all the data
   * @param pageNumber - page number to fetch
   * @param pageSize - number of items to fetch for the page
   */
  const pagination = (data, pageNumber, pageSize) => {
    let startIndex = (pageNumber - 1) * pageSize;
    //don't return the information that does not exist inside the data array
    if (startIndex >= data.length) {
      return [];
    }
    //set the page number, to the page number that we wanted to fetch so that we have information
    //about which page was the one that was last fetched
    setPageNumber(pageNumber);
    return data.slice(startIndex, startIndex + pageSize);
  };

  return (
    // Use the SafeAreaView component to ensure content is displayed within the safe area boundaries of the device
    <SafeAreaView>
      {/* Use ScrollView to allow users to scroll through content */}
      <ScrollView>
        {/* Use View to create a container for title and icon */}
        <View style={style.header}>
          {/* Use custom Title component to display the title */}
          <Title title={"Let's Explore"} />
          {/* Use Pressable to create a clickable component */}
          <Pressable style={style.messageIcon}>
            {/* Use FontAwesomeIcon component to display an icon from FontAwesome icon set */}
            <FontAwesomeIcon icon={faEnvelope} color={'#CACDDE'} size={20} />
            {/* Use View to create a container for message number */}
            <View style={style.messageNumberContainer}>
              {/* Use Text to display the number of messages */}
              <Text style={style.messageNumber}>2</Text>
            </View>
          </Pressable>
        </View>
        {/* Use View to create a container for the user stories */}
        <View style={style.userStoryContainer}>
          {/* Use FlatList to display user stories */}
          <FlatList
            //when the user scrolls through half of the data call onEndReached function
            onEndReachedThreshold={0.5}
            keyExtractor={item => item.id.toString()}
            onEndReached={() => {
              //if we are not already in the middle of fetching data then fetch the data
              if (!isLoading) {
                //set is loading to true because we just started fetching data
                setIsLoading(true);
                setRenderedData(prev => [
                  ...prev,
                  ...pagination(data, pageNumber + 1, pageSize),
                ]);
                //after updating rendered data we have to set is loading to false, because we loaded the data we needed
                setIsLoading(false);
              }
            }}
            // Hide horizontal scroll indicator
            showsHorizontalScrollIndicator={false}
            // Set FlatList to display horizontally
            horizontal={true}
            // Pass in data to be rendered in FlatList
            data={renderedData}
            // Define how each item should be rendered
            renderItem={({item}) => <UserStory firstName={item.firstName} />}
          />
        </View>

        <View style={style.userPostContainer}>
          {/* Use FlatList to display user stories */}
          <FlatList
            //when the user scrolls through half of the data call onEndReached function
            onMomentumScrollBegin={() => setIsLoadingPosts(false)}
            onEndReachedThreshold={0.5}
            keyExtractor={item => item.id.toString() + 'post'}
            onEndReached={() => {
              //if we are not already in the middle of fetching data then fetch the data
              //@TODO isLoading should be changed to isLoadingPosts
              if (!isLoading) {
                //set is loading to true because we just started fetching data
                setIsLoadingPosts(true);
                setRenderedDataPosts(prev => [
                  ...prev,
                  //@TODO we need to change pageNumber to postPageNumber, pageSize to pageSizePosts
                  ...pagination(posts, pageNumber + 1, pageSize, true),
                ]);
                //after updating rendered data we have to set is loading to false, because we loaded the data we needed
                setIsLoadingPosts(false);
              }
            }}
            // Hide vertical scroll indicator
            showsVerticalScrollIndicator={false}
            // Pass in data to be rendered in FlatList
            data={renderedDataPosts}
            // Define how each item should be rendered
            renderItem={({item}) => (
              <UserPost
                firstName={item.firstName}
                lastName={item.lastName}
                comments={item.comments}
                likes={item.likes}
                bookmarks={item.bookmarks}
                location={item.location}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
