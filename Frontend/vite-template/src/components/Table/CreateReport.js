import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { TextInput, FileInput, Select, Button, Notification } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreateReport = () => {
    const [newReport, setNewReport] = useState({
        fileNumber: '',
        patientFirstName: '',
        patientLastName: '',
        patientId: '',
        diagnosisTitle: '',
        diagnosisDetails: '',
        diagnosisDate: new Date(),
        laborantId: ''
    });
    const [laborants, setLaborants] = useState([]);
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    useEffect(() => {
        const fetchLaborants = async () => {
            try {
                const response = await axios.get('http://localhost:8080/laborants');
                // @ts-ignore
                const laborantOptions = response.data.map(laborant => ({
                    value: laborant.id.toString(),
                    label: `${laborant.firstName} ${laborant.lastName}`
                }));
                setLaborants(laborantOptions);
            }
            catch (error) {
                console.error('Error fetching laborants:', error);
            }
        };
        fetchLaborants();
    }, []);
    // @ts-ignore
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReport({ ...newReport, [name]: value });
    };
    // @ts-ignore
    const handleDateChange = (date) => {
        setNewReport({ ...newReport, diagnosisDate: date });
    };
    // @ts-ignore
    const handleLaborantChange = (value) => {
        setNewReport({ ...newReport, laborantId: value });
    };
    // @ts-ignore
    const handleFileChange = (file) => {
        setFile(file);
    };
    const createAndRedirect = async () => {
        await handleCreate();
        // @ts-ignore
        useNavigate('/appshell-layout');
    };
    const handleCreate = async () => {
        try {
            const reportData = {
                fileNumber: newReport.fileNumber,
                patientFirstName: newReport.patientFirstName,
                patientLastName: newReport.patientLastName,
                patientId: newReport.patientId,
                diagnosisTitle: newReport.diagnosisTitle,
                diagnosisDetails: newReport.diagnosisDetails,
                diagnosisDate: newReport.diagnosisDate,
                laborant: {
                    id: newReport.laborantId
                }
            };
            const reportResponse = await axios.post('http://localhost:8080/reports', reportData);
            const reportId = reportResponse.data.id;
            if (file && reportId) {
                const formData = new FormData();
                formData.append('file', file);
                await axios.post(`http://localhost:8080/reports/${reportId}/upload`, formData);
            }
            setSuccessMessage("Rapor successfully added!");
        }
        catch (error) {
            console.error('Error creating report:', error);
        }
    };
    return (_jsxs("div", { children: [_jsx("div", { children: successMessage && (_jsx(Notification
                // @ts-ignore
                , { 
                    // @ts-ignore
                    onClose: () => setSuccessMessage(null), color: "teal", title: "Ba\u015Far\u0131l\u0131!", children: successMessage })) }), _jsx("h1", { children: "Create Report" }), _jsxs("form", { children: [_jsx(TextInput, { label: "File Number", name: "fileNumber", value: newReport.fileNumber, onChange: handleChange }), _jsx(TextInput, { label: "Patient First Name", name: "patientFirstName", value: newReport.patientFirstName, onChange: handleChange }), _jsx(TextInput, { label: "Patient Last Name", name: "patientLastName", value: newReport.patientLastName, onChange: handleChange }), _jsx(TextInput, { label: "Patient ID", name: "patientId", value: newReport.patientId, onChange: handleChange }), _jsx(TextInput, { label: "Diagnosis Title", name: "diagnosisTitle", value: newReport.diagnosisTitle, onChange: handleChange }), _jsx(TextInput, { label: "Diagnosis Details", name: "diagnosisDetails", value: newReport.diagnosisDetails, onChange: handleChange }), _jsx(DateInput, { label: "Diagnosis Date", value: newReport.diagnosisDate, onChange: handleDateChange }), _jsx(Select, { label: "Laborant", placeholder: "Select a laborant", data: laborants, value: newReport.laborantId, onChange: handleLaborantChange }), _jsx(FileInput, { label: "Report Image", placeholder: "Upload a file", onChange: handleFileChange }), _jsx(Button, { onClick: createAndRedirect, children: "Create Report" })] })] }));
};
export default CreateReport;
