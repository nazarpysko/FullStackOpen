import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAnecdotes, updateNote } from "./requests";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { useNotificationDispatch } from "./NotificationContext";


const App = () => {
  const queryClient = new useQueryClient();
  const dispatch = useNotificationDispatch();

  const voteAnecdoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const handleVote = anecdote => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: "SHOW", payload: `anecdote '${anecdote.content}' has been voted` })
    setTimeout(() => dispatch({ type: "HIDE" }), 5000);
  };

  const result = useQuery("anecdotes", getAnecdotes, {
    retry: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote services are not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      {/* <p>Notification: {notification}</p> */}

      <Notification />
      <AnecdoteForm />

      <br />

      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;