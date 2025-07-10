import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardPortfolioForm from './DashboardPortfolioForm';

const DashboardAddPortfolio = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    const handleSave = async (formData) => {
        setIsSubmitting(true);
        setSaveMessage('Saving project...');

        try {

            await axios.post(
                `${import.meta.env.VITE_SERVER_DOMAIN}/project/add`,
                formData,
                { withCredentials: true }
            );
            setSaveMessage('Project saved successfully! Redirecting...');

            setTimeout(() => {
                navigate('/admin/dashboard/portfolios');
            }, 1000);
        } catch (error) {
            setSaveMessage(`Failed to save project: ${error.response?.data?.error || error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Add New Portfolio Project</h1>
            </div>

            {saveMessage && (
                <div className={`mb-4 p-3 rounded-md ${saveMessage.includes('success')
                        ? 'bg-green-100 text-green-800'
                        : saveMessage.includes('Saving')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                    {saveMessage}
                </div>
            )}

            <DashboardPortfolioForm
                onSave={handleSave}
                isSubmitting={isSubmitting}
            />
        </div>
    );
};

export default DashboardAddPortfolio;