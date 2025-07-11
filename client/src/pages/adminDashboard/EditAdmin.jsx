import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { HiEye, HiEyeOff, HiArrowLeft } from 'react-icons/hi';
import { uploadImage } from '../../common/aws'

const EditAdmin = () => {
    const { email } = useParams();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        description: '',
        tagline: '',
        image: '',
        socialLinks: {
            instagram: '',
            facebook: '',
            linkedin: '',
            github: '',
            twitter: ''
        }
    });

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (!email) return;

        const fetchAdmin = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_DOMAIN}/admin/get-admin/${email}`,
                    { withCredentials: true }
                );

                const adminData = response.data.admin;

                setAdmin({
                    _id: adminData._id || '',
                    firstName: adminData.firstName || '',
                    lastName: adminData.lastName || '',
                    description: adminData.description || "",
                    email: adminData.email || '',
                    image: adminData.image || '',
                    tagline: adminData.tagline || '',
                    socialLinks: adminData.socialLinks || {
                        instagram: '',
                        facebook: '',
                        linkedin: '',
                        github: '',
                        twitter: ''
                    }
                });

                setImagePreview(adminData.image || '');
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch admin details');
                setLoading(false);
            }
        };

        fetchAdmin();
    }, [email]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Check if it's a social link field
        if (name.startsWith('socialLinks.')) {
            const field = name.split('.')[1];
            setAdmin(prev => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [field]: value
                }
            }));
        } else {
            setAdmin(prev => ({ ...prev, [name]: value }));
        }

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setAdmin(prev => ({ ...prev, image: file }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!admin.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!admin.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (password && password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setIsSubmitting(true);
            let imageUrl = admin.image;

            // Upload new image if it's a File object
            if (typeof imageUrl === 'object' && imageUrl instanceof File) {
                try {
                    imageUrl = await uploadImage(imageUrl);
                } catch (uploadError) {
                    toast.error('Image upload failed');
                    setIsSubmitting(false);
                    return;
                }
            }

            // Prepare update data - INCLUDING SOCIAL LINKS
            const updateData = {
                firstName: admin.firstName,
                lastName: admin.lastName,
                description: admin.description,
                tagline: admin.tagline,
                image: imageUrl,
                socialLinks: admin.socialLinks,  // Add social links here
                ...(password && { password })
            };

            // Update admin data
            await axios.put(
                `${import.meta.env.VITE_SERVER_DOMAIN}/admin/update-admin/${admin._id}`,
                updateData,
                { withCredentials: true }
            );

            toast.success('Admin updated successfully');
            setTimeout(() => {
                navigate('/admin/dashboard/admins');
            }, 600);
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'Failed to update admin';
            toast.error(errorMsg);
            console.error('Error updating admin:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <Toaster />

            <button
                onClick={() => navigate('/admin/dashboard/admins')}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
                <HiArrowLeft className="mr-1" /> Back to Admins
            </button>

            <h1 className="text-2xl font-bold mb-6">Edit Admin Profile</h1>

            <form onSubmit={handleSubmit} autoComplete="off" className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="md:col-span-1 flex flex-col items-center">
                        <div className="mb-4 relative">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Admin"
                                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                                />
                            ) : (
                                <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 flex items-center justify-center text-gray-500 text-2xl">
                                    {admin.firstName?.charAt(0)}
                                    {admin.lastName?.charAt(0)}
                                </div>
                            )}

                            <label
                                htmlFor="image-upload"
                                className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                            </label>

                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                        <p className="text-sm text-gray-500 text-center">
                            Click on the icon to change profile photo
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={admin.firstName}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    className={`w-full px-3 py-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="John"
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={admin.lastName}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    className={`w-full px-3 py-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Doe"
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tagline
                            </label>
                            <input
                                type="text"
                                name="tagline"
                                autoComplete="off"
                                data-form-type="other"
                                value={admin.tagline}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded ${errors.tagline ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="(e.g., Software Engineer)"
                            />
                            {errors.tagline && (
                                <p className="text-red-500 text-xs mt-1">{errors.tagline}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={admin.description}
                                onChange={handleInputChange}
                                autoComplete="off"
                                data-form-type="other"
                                className={`w-full px-3 py-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="suggested description is 200 characters"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={admin.email}
                                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                                readOnly
                                disabled
                            />
                            <p className="text-gray-500 text-xs mt-1">
                                Email cannot be changed for security reasons
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Change Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    autoComplete="new-password"
                                    data-form-type="other"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                            )}
                            <p className="text-gray-500 text-xs mt-1">
                                Leave blank to keep current password
                            </p>
                        </div>

                        {/* Social Media Links Section */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3 text-gray-700">Social Media Links</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: 'instagram', icon: 'fab fa-instagram', color: 'bg-pink-600' },
                                    { name: 'facebook', icon: 'fab fa-facebook', color: 'bg-blue-700' },
                                    { name: 'linkedin', icon: 'fab fa-linkedin', color: 'bg-blue-500' },
                                    { name: 'github', icon: 'fab fa-github', color: 'bg-gray-800' },
                                    { name: 'twitter', icon: 'fab fa-twitter', color: 'bg-blue-400' }
                                ].map((platform) => (
                                    <div key={platform.name} className="flex items-center">
                                        <div className={`${platform.color} w-10 h-10 rounded-l flex items-center justify-center`}>
                                            <i className={`${platform.icon} text-white`}></i>
                                        </div>
                                        <input
                                            type="url"
                                            name={`socialLinks.${platform.name}`}
                                            value={admin.socialLinks[platform.name] || ''}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            data-form-type="other"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-r"
                                            placeholder={`https://${platform.name}.com/username`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/dashboard/admins')}
                        className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAdmin;