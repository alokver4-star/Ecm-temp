import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../../config";
import { addUser, removeUser, resetOrderCount } from "../redux/orebiSlice";
import Container from "../components/Container";
import { FaSignOutAlt, FaUserCircle, FaCog, FaHeart } from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.orebiReducer.userInfo);

  useEffect(() => {
    // Check if user is logged in
    if (!userInfo) {
      navigate("/signin");
      return;
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    // Fetch fresh user data from server only once on mount
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      try {
        const response = await axios.get(`${serverUrl}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          const userData = response.data.user;
          // Update Redux store with fresh data
          dispatch(addUser(userData));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, [dispatch]); // Only run once on mount

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    dispatch(resetOrderCount());
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (!userInfo) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-8 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                  <FaUserCircle className="text-4xl text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {userInfo.name || userInfo.email}
                  </h1>
                  <p className="text-gray-600">{userInfo.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Account Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-lg font-medium text-gray-900">
                    {userInfo.name || "Not set"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-medium text-gray-900">
                    {userInfo.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="text-lg font-medium text-gray-900">
                    {userInfo.role === "admin" ? "Administrator" : "Customer"}
                  </p>
                </div>
              </div>

              {userInfo.phone && (
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-lg font-medium text-gray-900">
                      {userInfo.phone}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate("/orders")}
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaCog className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">View Orders</p>
                    <p className="text-sm text-gray-500">Check your order history</p>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/shop")}
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaHeart className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Continue Shopping</p>
                    <p className="text-sm text-gray-500">Browse our products</p>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
