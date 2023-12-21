/* eslint-disable react/react-in-jsx-scope */
import {View, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import style from './style';
import UserProfileImage from '../userProfileImages/UserProfileImage';

// Define a new React component called UserStory
const UserStory = props => {
  // Render a container view for the user story
  return (
    <View style={style.storyContainer}>
      {/* Render a container view for the user image */}
      <UserProfileImage />
      {/* Render the user's first name as text */}
      <Text style={style.name}>{props.firstName}</Text>
    </View>
  );
};

// Define PropTypes for the UserStory component
UserStory.propTypes = {
  // The first name of the user as a required string
  firstName: PropTypes.string.isRequired,
};

export default UserStory;
