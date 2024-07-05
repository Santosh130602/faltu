import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap'; // Replace with Tailwind Spinner if needed
import { useToast } from '@chakra-ui/react';
import SideBar from '../components/general/sideBar';

const UserInfo = () => {
    const [user, setUser] = useState({});
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingEducation, setLoadingEducation] = useState(false);
    const [education, setEducation] = useState({
        highschool: {},
        intermediate: {},
        graduation: {},
        postGraduation: {}
    });
    const [currentEducation, setCurrentEducation] = useState('highschool');

    const toast = useToast();
    const token = localStorage.getItem('token');
    const config = token ? {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-type": "application/json",
        },
    } : {};

    useEffect(() => {
        fetchUserProfile();
        fetchUserEducation();
    }, []);

    const fetchUserProfile = async () => {
        setLoadingProfile(true);
        try {
            const response = await axios.get('http://localhost:4000/api/user/profile', config);
            setUser(response.data.user);
            setLoadingProfile(false);
        } catch (error) {
            toast({
                title: error.response?.data?.message || "Error fetching profile!",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            setLoadingProfile(false);
        }
    };

    const fetchUserEducation = async () => {
        setLoadingEducation(true);
        try {
            const response = await axios.get('http://localhost:4000/api/user/education', config);
            setEducation(response.data.education);
            setLoadingEducation(false);
        } catch (error) {
            toast({
                title: error.response?.data?.message || "Error fetching education details!",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
            setLoadingEducation(false);
        }
    };

    const handleEducationChange = (field, value) => {
        setEducation((prevEducation) => ({
            ...prevEducation,
            [currentEducation]: {
                ...prevEducation[currentEducation],
                [field]: value,
            },
        }));
    };

    const handleSaveEducation = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/education/addedulevel', {
                
                educationType: currentEducation,
                educationData: education[currentEducation],
            }, config);
            toast({
                title: response.data.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        } catch (error) {
            toast({
                title: error.response?.data?.message || "Error saving education details!",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });
        }
    };

    return (
        <div className='flex'>
            {/* Left Section for Navigation */}
            <SideBar />

            {/* Right Section for Profile */}
            <div className="w-4/5 p-8 ml-[20%]">
                {/* Profile Info */}
                {loadingProfile ? (
                    <Spinner animation="border" />
                ) : (
                    <div className="flex items-center mb-8">
                        <img src={user.avatar} alt="User Avatar" className="h-16 w-16 rounded-full mr-4" />
                        <div>
                            <h2 className="text-xl font-semibold">{user.username}</h2>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>
                )}

                {/* Education Details */}
                <div className="space-y-4">
                    <div className="flex space-x-4">
                        <button
                            className={`px-4 py-2 rounded-md ${currentEducation === 'highschool' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setCurrentEducation('highschool')}
                        >
                            Highschool
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${currentEducation === 'intermediate' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setCurrentEducation('intermediate')}
                        >
                            Intermediate
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${currentEducation === 'graduation' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setCurrentEducation('graduation')}
                        >
                            Graduation
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${currentEducation === 'postGraduation' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setCurrentEducation('postGraduation')}
                        >
                            Post Graduation
                        </button>
                    </div>

                    {loadingEducation ? (
                        <Spinner animation="border" />
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700">School/College Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
                                    value={education[currentEducation]?.school || ''}
                                    onChange={(e) => handleEducationChange('school', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Passing Year</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
                                    value={education[currentEducation]?.passingYear || ''}
                                    onChange={(e) => handleEducationChange('passingYear', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">State</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
                                    value={education[currentEducation]?.state || ''}
                                    onChange={(e) => handleEducationChange('state', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">District</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
                                    value={education[currentEducation]?.district || ''}
                                    onChange={(e) => handleEducationChange('district', e.target.value)}
                                />
                            </div>
                            <div>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    onClick={handleSaveEducation}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
