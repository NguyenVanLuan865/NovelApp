import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import theme from '../styles/theme.js';
import { Ionicons } from 'react-native-vector-icons';
import LoadingModal from '../component/LoadingModel.js';
import { fetchComment, postComment, postReply } from '../api/API.js';
import { useUser } from '../context/UserContext';

export function CommentScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(null);
  const [replyText, setReplyText] = useState(null);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [showAllReplies, setShowAllReplies] = useState({});
  const { novelId, chapterId } = route.params;
  const [dataComment, setDataComment] = useState(null);
  const { user } = useUser();
  const [replyingTo, setReplyingTo] = useState(null);
  const textInputRef = useRef(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchComment(novelId);
        setDataComment(data.comments);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [novelId]);


  const handleReply = (commentId) => {
    setReplyingTo(commentId);
    setTimeout(() => {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, 100);
  };


  const handleReplySubmit = async (commentId) => {
    if (comments.trim()) {
      try {
        await postReply(comments, user.id, commentId);

        const data = await fetchComment(novelId);
        setDataComment(data.comments);

        setComments(null);
      } catch (error) {
        console.error("Lỗi khi gửi trả lời:", error);
      }
    }
  };

  const handleShowAllReplies = (commentId) => {
    setShowAllReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };



  const handleCommentSubmit = async () => {
    try {
      await postComment(comments, user.id, novelId, chapterId);
      setComments(null);
      const data = await fetchComment(novelId);
      setDataComment(data.comments);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = () => {
    if (replyingTo) {
      handleReplySubmit(replyingTo);
    } else {
      handleCommentSubmit();
    }
    setComments(null);
    setReplyingTo(null);
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.avatarContainer}>
        <Image source={require('../icon/avatar.jpg')} style={styles.avatar} />
      </View>
      <View style={styles.commentContent}>
        <Text style={styles.author}>{item.userId.username}</Text>
        <Text style={styles.content}>{item.content}</Text>
        <Text style={styles.timestamp}>{new Date(item.createdAt).toLocaleString()}</Text>
        {item.replyCount != 0 && (
          <Text style={styles.repliesCount}>{item.replyCount} replies</Text>
        )}

        {item.replies && (
          <>
            {showAllReplies[item.id] ? (
              item.replies.map((reply) => (
                <View key={reply.id} style={styles.replyContainer}>
                  <Text style={styles.replyAuthor}>{reply.userId.username}</Text>
                  <Text style={styles.replyContent}>{reply.content}</Text>
                  <Text style={styles.replyTimestamp}>{new Date(reply.createdAt).toLocaleString()}</Text>
                </View>
              ))
            ) : (
              item.replies.length > 0 && (
                <View style={styles.replyContainer}>
                  <Text style={styles.replyAuthor}>
                    {item.replies[item.replies.length - 1].userId.username}
                  </Text>
                  <Text style={styles.replyContent}>
                    {item.replies[item.replies.length - 1].content}
                  </Text>
                  <Text style={styles.replyTimestamp}>
                    {new Date(item.replies[item.replies.length - 1].createdAt).toLocaleString()}
                  </Text>
                </View>
              )
            )}

            {item.replies.length > 1 && (
              <TouchableOpacity onPress={() => handleShowAllReplies(item.id)}>
                <Text style={styles.showRepliesButton}>
                  {showAllReplies[item.id] ? 'Ẩn tất cả' : 'Xem tất cả'}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}

        <TouchableOpacity onPress={() => handleReply(item.id)}>
          <Text style={styles.replyButton}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '800',
          color: theme.colors.text,
        }}>
          Bình Luận
        </Text>
      </View>
      <ScrollView style={styles.container}>
        <FlatList
          scrollEnabled={false}
          data={dataComment}
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          inverted
        />
      </ScrollView>
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          ref={textInputRef}
          placeholder="Viết bình luận..."
          placeholderTextColor={theme.colors.secondarytext}
          value={comments}
          onChangeText={setComments}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={{ width: theme.dimensions.width * 0.1, alignItems: 'center', justifyContent: 'center' }} >
          <Ionicons name="send" size={30} color={theme.colors.tilteCategory2} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.background,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentContent: {
    flex: 1,
  },
  author: {
    fontWeight: 'bold',
    color: theme.colors.text
  },
  content: {
    marginVertical: 5,
    color: theme.colors.text
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
  },
  repliesCount: {
    color: theme.colors.tilteCategory2,
    fontSize: 12,
  },
  replyContainer: {
    paddingLeft: 20,
    marginTop: 5,
  },
  replyAuthor: {
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.colors.text
  },
  replyContent: {
    fontSize: 14,
    color: theme.colors.text,
  },
  replyTimestamp: {
    fontSize: 12,
    color: '#888',
  },
  replyButton: {
    fontWeight: '700',
    color: theme.colors.tilteCategory2,
    marginTop: 5,
  },
  replyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  replyInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    color: theme.colors.text
  },
  showRepliesButton: {
    color: theme.colors.tilteCategory2,
    marginTop: 5,
  },
  commentInput: {
    width: theme.dimensions.width * 0.8,
    padding: 10,
    borderWidth: 2,
    marginLeft: 20,
    borderRadius: 5,
    borderColor: "#ddd",
    color: theme.colors.text,
    backgroundColor: theme.colors.backgroundSetting
  },
  commentInputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: theme.dimensions.width,
    height: theme.dimensions.height / 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSetting
  }
});
