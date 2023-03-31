import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, seContent] = useState("");
  const [userId, setUserId] = useState("");
  const users = useSelector(selectAllUsers);
  const onSavedPostClicked = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      seContent("");
      setTitle("");
      setUserId("");
    }
  };
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const onAuthorChanged = (e) => {
    setUserId(e.target.value);
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add new post</h2>
      <form>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions}
        </select>
        <input
          onChange={(e) => seContent(e.target.value)}
          value={content}
          type="text"
          placeholder="content"
        />
        <button disabled={!canSave} onClick={onSavedPostClicked}>
          Save post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
