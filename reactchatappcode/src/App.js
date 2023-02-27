import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Login from './Pages/Login';
import Index from './Pages';
import Users from './Pages/Users';
import Chat from './Pages/Chat';
import Logout from './Pages/Logout';
import LoginAdmin from './Pages/Admin/Login';
import UsersAdmin from './Pages/Admin/Users';
import LogoutAdmin from './Pages/Admin/Logout';
import ChatAdmin from './Pages/Admin/Chat';
import Admins from './Pages/Admin/Admins';
import Settings from './Pages/Settings';
import ChangePfp from './Pages/ChangePfp';
import AddFriend from './Pages/AddFriend';
import Notifications from './Pages/Notifications';
import CreateGroup from './Pages/CreateGroup';
import GroupChat from './Pages/GroupChat';
import AddToGroup from './Pages/AddToGroup';
import Call from './Pages/Call';
import ChangePassword from './Pages/ChangePassword';
import DeleteAccount from './Pages/DeleteAccount';
import Room  from './Pages/Room';

function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/admin/users" element={<UsersAdmin />} />
        <Route path="/admin/logout" element={<LogoutAdmin />} />
        <Route path="/admin/chat" element={<ChatAdmin />} />
        <Route path="/admin/admins" element={<Admins />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/changepic" element={<ChangePfp />} />
        <Route path="/addfriend" element={<AddFriend />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/creategroup" element={<CreateGroup />} />
        <Route path="/groupchat" element={<GroupChat />} />
        <Route path="/addtogroup" element={<AddToGroup />} />
        <Route path="/call" element={<Call />} />
        <Route path="/changepsw" element={<ChangePassword />} />
        <Route path="/deleteaccount" element={<DeleteAccount />} />
        <Route path="/room/:roomID" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
