import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Student } from "../model/student.model";

export const studentApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://65fe560fb2a18489b385eea1.mockapi.io",
    // prepareHeaders: (headers) => {
    //   headers.set("Access-Control-Allow-Headers", "*");
    // },
  }),
  tagTypes: ["Students"],
  endpoints: (builder) => ({
    getStudents: builder.query<Student[], void>({
      query: () => "/student-details",
      providesTags: ["Students"],
      transformResponse: (response: Student[], meta, args) => {
        return response.sort((a, b) => a.studentName.localeCompare(b.studentName));
      },
    }),
    getStudent: builder.query<Student, string>({
      query: (id) => `/student-details/${id}`,
      providesTags: ["Students"],
    }),
    addStudent: builder.mutation<void, Student>({
      query: (student) => ({
        url: "/student-details",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),
    deleteStudent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/student-details/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
    updateStudent: builder.mutation<void, Student>({
      query: ({ id, ...rest }) => ({
        url: `/student-details/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useGetStudentQuery,
  useUpdateStudentMutation,
} = studentApi;
