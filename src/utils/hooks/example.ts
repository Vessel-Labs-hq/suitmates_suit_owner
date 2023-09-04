// import { useQuery, useQueryClient, useMutation } from "react-query";
// import exampleService from "../apis/example";

// const useAllPosts = () => {
//   return useQuery(["posts"], exampleService.getAllPosts);
// };

// const usePostById = () => {
//   return useQuery(["posts"], exampleService.getAllPosts);
// };

// const useCreatePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     () => {
//       return exampleService.addPost();
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("posts");
//       },
//     }
//   );
// };

// const useUpdatePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     () => {
//       return exampleService.updatePost();
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("posts");
//       },
//     }
//   );
// };

// const useDeletePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     () => {
//       return exampleService.deletePost();
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("posts");
//       },
//     }
//   );
// };

// export {
//   useCreatePost,
//   useUpdatePost,
//   usePostById,
//   useAllPosts,
//   useDeletePost,
// };