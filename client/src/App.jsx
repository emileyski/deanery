import {
  // Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Signup, { action as signupAction } from "./features/signup/Signup";
import Login, { action as loginAction } from "./features/login/Login";
import EnroleeCertificatePage, {
  loader as enroleeCertificatePageLoader,
} from "./features/enrolee-certificate/EnroleeCertificatePage";
import CertificateUploadPage from "./features/enrolee-certificate/CertificateUploadPage";
import EnroleeApllicationsPage, {
  loader as enroleeApllicationsLoader,
} from "./features/enrolee-applications/EnroleeApllicationsPage";
import UserPage from "./features/user/UserPage";
import AddSpecialtyPage from "./features/dean-specialties/AddSpecialty"; // action as addSpecialtyPageAction,
import DeanSpecialtiesPage, {
  deanSpecialtiesPageLoader,
} from "./features/dean-specialties/DeanSpecialtiesPage";
import DeanApplicationsPage, {
  loader as deanApplicationsLoader,
} from "./features/dean-applications/DeanApplicationsPage";
import StreamsBySpecialtyPage, {
  loader as streamsBySpecialtyLoader,
} from "./features/streams/StreamsBySpecialtyPage";
import StreamById, { streamByIdLoader } from "./features/streams/StreamById";
import GroupInfo, { groupByIdLoader } from "./features/groups/GroupInfo";
import DeaneryRequestsPage from "./features/dean-questions/DeanRequestsPage";
import CreateDeanQuestionPage from "./features/student-questions/CreateDeanQuestionPage";
import StudentQuestionsListPage, {
  loader as studentQuestionsListPage,
} from "./features/student-questions/StudentQuestionsListPage";
import WelcomePage from "./features/WelcomePage";
import DeanStudentsPage, {
  deanStudentsPageLoader,
} from "./features/dean-students/DeanStudentsPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "/signup",
        element: <Signup />,
        action: signupAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/enrolee/certificate",
        element: <EnroleeCertificatePage />,
        loader: enroleeCertificatePageLoader,
      },
      {
        path: "/enrolee/certificate/new",
        element: <CertificateUploadPage />,
      },
      {
        path: "/enrolee/applications",
        element: <EnroleeApllicationsPage />,
        loader: enroleeApllicationsLoader,
      },
      {
        path: "/dean/specialties/",
        element: <DeanSpecialtiesPage />,
        loader: deanSpecialtiesPageLoader,
      },
      {
        path: "/dean/specialties/new",
        element: <AddSpecialtyPage />,
      },
      {
        path: "/dean/applications/",
        element: <DeanApplicationsPage />,
        loader: deanApplicationsLoader,
      },
      {
        path: "/dean/students/",
        element: <DeanStudentsPage />,
        loader: deanStudentsPageLoader,
      },
      {
        path: "/dean/questions/",
        element: <DeaneryRequestsPage />,
        loader: deanApplicationsLoader,
      },
      {
        path: "/specialty/:id",
        element: <StreamsBySpecialtyPage />,
        loader: streamsBySpecialtyLoader,
      },
      {
        path: "/stream/:id",
        element: <StreamById />,
        loader: streamByIdLoader,
      },
      {
        path: "/group/:id",
        element: <GroupInfo />,
        loader: groupByIdLoader,
      },
      {
        path: "/student/questions/",
        element: <StudentQuestionsListPage />,
        loader: studentQuestionsListPage,
      },
      {
        path: "/student/questions/new",
        element: <CreateDeanQuestionPage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
