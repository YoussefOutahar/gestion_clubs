import { Avatar, Box, Divider, Icon, IconButton, styled, TextField, useTheme } from '@mui/material';
import { ChatAvatar } from '../components';
import { convertHexToRGB } from '../utils/utils';
import { useCallback, useEffect, useState } from 'react';
import ScrollBar from 'react-perfect-scrollbar';
import { formatDistanceToNow } from 'date-fns';
import { H5, H6, Span } from './Typography';
import MessagesService from '../DataBase/services/MessagesService';
import UsersService from '../DataBase/services/UsersService'
import ClubsService from '../DataBase/services/ClubsService';
import { getProfileById } from '../DataBase/services/UsersService';

const ChatContainer = styled('div')(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#fff',
}));

const StyledScrollBar = styled(ScrollBar)(() => ({
  flexGrow: 1,
}));

const ProfileBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 12px 12px 20px',
  color: theme.palette.primary.main,
  background: '#fafafa',
}));

const ChatStatus = styled('div')(({ theme }) => ({
  marginLeft: '12px',
  color: theme.palette.primary.main,
  '& h5': {
    marginTop: 0,
    fontSize: '14px',
    marginBottom: '3px',
  },
  '& span': { fontWeight: '500' },
}));

const ChatMessage = styled('div')(({ theme }) => ({
  padding: '8px',
  maxWidth: 240,
  fontSize: '14px',
  borderRadius: '4px',
  marginBottom: '8px',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  color: theme.palette.primary.main,
  background: '#fafafa',
}));

const MessageTime = styled('span')(({ theme }) => ({
  fontSize: '13px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const ChatImgContainer = styled('div')(({ theme }) => ({
  padding: '20px',
  display: 'flex',
  justifyContent: 'flex-end',
}));

const ChatImgBox = styled('div')(({ theme }) => ({
  padding: '8px',
  fontSize: '14px',
  maxWidth: 240,
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  color: theme.palette.primary.main,
  background: '#fafafa',
}));

const ChatImg = styled('img')(() => ({ width: '40px' }));
const ChatImgSize = styled(MessageTime)(() => ({}));

// for previewing bot message
const globalMessageList = [];

const Chatbox = ({ togglePopup }) => {
  const [isAlive, setIsAlive] = useState(true);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();
  const [userName, setUserName] = useState();
  const [clubName, setClubName] = useState();
  const [clubLogo, setClubLogo] = useState();
  const chatBottomRef = document.querySelector('#chat-scroll');

  const sendMessageOnEnter = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      let tempMessage = message.trim();
      if (tempMessage !== '') {
        // Create the message object
        let messageObject = {
          content: tempMessage,
          user_id: currentUserId,
          userName: userName,
          created_at: new Date(),

        };

        // Append the new message to the existing messageList
        setMessageList((prevMessageList) => [...prevMessageList, messageObject]);


        // Call MessagesService.addMessage to store the message
        MessagesService.addMessage(messageObject)
          .then((response) => {
            // Handle success if needed
          })
          .catch((error) => {
            console.error("Error storing the message:", error);
          });

        // Optional: Simulate a reply (dummyReply) for immediate response
        dummyReply();
      }
      setMessage('');
    }
  };

  const dummyReply = async () => {
    setTimeout(() => {
      let tempList = [...messageList];
      let messageObject = {
        text: 'Good to hear from you. enjoy!!!',
        user_id: 'opponents contact id',
        avatar: '/assets/images/faces/13.jpg',
        name: 'Frank Powell',
      };

      tempList.push(messageObject);
      globalMessageList.push(messageObject);
      if (isAlive) setMessageList(globalMessageList);
    }, 2000);
  };

  const scrollToBottom = useCallback(() => {
    if (chatBottomRef) {
      chatBottomRef.scrollTo({
        top: chatBottomRef.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatBottomRef]);

  const formatTimePassed = (messageDate) => {
    if (typeof messageDate === 'string') {
      // Parse the date string to create a valid Date object
      messageDate = new Date(messageDate);
    }

    const now = new Date();
    const timePassed = formatDistanceToNow(messageDate, { addSuffix: true });
    return timePassed;
  };


  useEffect(() => {
    async function fetchUserData() {
      try {
        const currentUser = await UsersService.getCurrentUser();

        if (currentUser) {
          const userProfile = await getProfileById(currentUser.id);
          setCurrentUserId(currentUser.id);
          console.log("Current user : ", userProfile);
          setUserName(userProfile[0].name);
          const clubId = userProfile[0].id_club;
          const clubData = await ClubsService.getClub(clubId);
          setClubName(clubData[0].name);
          setClubLogo(clubData[0].log);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchUserData();
  }, []);

  /*useEffect(() => {
    if (isAlive) {
      setMessageList([
        {
          user_id: '323sa680b3249760ea21rt47',
          text: 'Do you ever find yourself falling into the “discount trap?”',
          time: '2018-02-10T08:45:28.291Z',
          id: '323sa680b3249760ea21rt47',
          name: 'Frank Powell',
          avatar: '/assets/images/faces/13.jpg',
          status: 'online',
          mood: '',
        }
      ]);
    }
    // getChatRoomByuser_id(currentUserId, "323sa680b3249760ea21rt47").then(
    //   ({ data }) => {
    //     if (isAlive) {
    //       setMessageList(data?.messageList);
    //     }
    //   }
    // );
  }, [isAlive]); */

  useEffect(() => {
    async function fetchMessages() {
      try {
        const data = await MessagesService.getMessages();
        console.log("Received messages data:", data);

        // Assuming that the data structure is an array of messages
        if (Array.isArray(data)) {
          data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          setMessageList(data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }

    fetchMessages();
  }, []);

  /*useEffect(() => {
    scrollToBottom();
    return () => setIsAlive(false);
  }, [messageList, scrollToBottom]);*/

  useEffect(() => {
    return () => setIsAlive(false);
  }, []);

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const textPrimary = palette.text.primary;

  return (
    <ChatContainer>
      <ProfileBox>
        <Box display="flex" alignItems="center">
          <ChatAvatar src={clubLogo} status="online" />
          <ChatStatus>
            <H5>{clubName} Forum</H5>
            <Span>Active</Span>
          </ChatStatus>
        </Box>
        <IconButton onClick={togglePopup}>
          <Icon fontSize="small">clear</Icon>
        </IconButton>
      </ProfileBox>
      <StyledScrollBar id="chat-scroll">
        {messageList.map((item, ind) => (
          <Box
            key={ind}
            p="20px"
            display="flex"
            sx={{
              justifyContent: currentUserId === item.user_id && 'flex-end',
            }}
          >
            {currentUserId !== item.user_id}
            <Box ml="12px">
              {currentUserId !== item.user_id && (
                <H5
                  sx={{
                    mb: '4px',
                    fontSize: '14px',
                    color: primary,
                  }}
                >
                  {item.userName}
                </H5>
              )}
              <ChatMessage>{item.content}</ChatMessage>
              <MessageTime>{formatTimePassed(item.created_at)}</MessageTime>
            </Box>
          </Box>
        ))}

        {/* example of image sent by current user
        <ChatImgContainer>
          <Box ml="12px">
            <ChatImgBox>
              <ChatImg alt="laptop" src="/assets/images/laptop-1.png" />
              <Box ml="12px">
                <H6 sx={{ mt: 0, mb: '4px' }}>Asus K555LA.png</H6>
                <ChatImgSize>21.5KB</ChatImgSize>
              </Box>
            </ChatImgBox>
            <MessageTime>1 minute ago</MessageTime>
          </Box>
        </ChatImgContainer>*/}
      </StyledScrollBar>
      <div>
        <Divider
          sx={{
            background: `rgba(${convertHexToRGB(textPrimary)}, 0.15)`,
          }}
        />
        <TextField
          placeholder="Type here ..."
          multiline
          rowsMax={4}
          fullWidth
          sx={{ '& textarea': { color: primary } }}
          InputProps={{
            endAdornment: (
              <Box display="flex">
                <IconButton size="small">
                  <Icon>tag_faces</Icon>
                </IconButton>
                <IconButton size="small">
                  <Icon>attachment</Icon>
                </IconButton>
              </Box>
            ),
            classes: { root: 'pl-5 pr-3 py-3 text-body' },
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={sendMessageOnEnter}
        />
      </div>
    </ChatContainer>
  );
};

export default Chatbox;
