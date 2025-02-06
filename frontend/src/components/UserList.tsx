import React, { useEffect, useState } from "react";
import {
  fetchUsers,
  deleteUser,
  updateUser,
  createUser,
} from "../services/api";
import UserModal from "./common/userModel";
import DeleteModal from "./common/DeleteModal";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (user: any) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.id);
        setUsers(users.filter((user) => user.id !== userToDelete.id));
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const openModal = (
    user: any = { name: "", email: "", profile_image: "" }
  ) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserSubmit = async (user: any) => {
    try {
      if (user.id) {
        await updateUser(user.id, user);
      } else {
        const response = await createUser(user);
      }
      const response = await fetchUsers();
      setUsers(response.data);
      closeModal();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4 md:mb-0">
            User List
          </h2>
          <button
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all"
            onClick={() => openModal()}
          >
            Add User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 border-b text-left">Profile Image</th>
                <th className="py-3 px-4 border-b text-left">Name</th>
                <th className="py-3 px-4 border-b text-left">Email</th>
                <th className="py-3 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-4 border-b">
                    <img
                      src={user.profile_image || "https://via.placeholder.com/50"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="py-3 px-4 border-b">{user.name}</td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  <td className="py-3 px-4 border-b flex flex-wrap gap-2">
                    <button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                      onClick={() => openModal(user)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all"
                      onClick={() => handleDelete(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        user={selectedUser}
        onClose={closeModal}
        onSubmit={handleUserSubmit}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        userName={userToDelete ? userToDelete.name : ""}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default UserList;
