import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewpost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [userId, setUserId] = useState("");
  const users = useSelector(selectAllUsers);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavedPostClicked = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewpost({ title, body: content, userId })).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error(err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

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
          onChange={(e) => setContent(e.target.value)}
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
