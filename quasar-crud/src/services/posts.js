import useApi from "src/composable/UseApi";

export default function usePost() {
  const url = "posts";
  const { list, post, update, remove, getById } = useApi(url);
  return {
    list,
    post,
    update,
    remove,
    getById
  };
}
