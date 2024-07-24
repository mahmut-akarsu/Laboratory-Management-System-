import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Table, Group, Button, MantineProvider, createTheme, Modal, TextInput, FileInput, Select } from '@mantine/core';
import axios from 'axios';
import classes from './Demo.module.css';
const theme = createTheme({
    components: {
        Button: {
            classNames: classes,
        },
    },
});
export function ReportsTable() {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [updatedReport, setUpdatedReport] = useState({});
    const [file, setFile] = useState(null);
    const [diagnosisDate, setDiagnosisDate] = useState(null);
    const [laborants, setLaborants] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const handleLaborantChange = async (value) => {
        setUpdatedReport((prev) => ({ ...prev, laborantId: value }));
        // Fetch laborant details and update the updatedReport
        if (value) {
            const laborantDetails = await fetchLaborantDetails(value);
            if (laborantDetails) {
                setUpdatedReport((prev) => ({
                    ...prev,
                    laborant: laborantDetails,
                }));
            }
        }
    };
    const fetchData = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/reports");
            setReports(data);
        }
        catch (error) {
            console.error("Error fetching reports:", error);
        }
    };
    const fetchLaborants = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/laborants');
            setLaborants(data.map(laborant => ({
                value: laborant.id.toString(), // Convert ID to string
                label: `${laborant.firstName} ${laborant.lastName}`
            })));
        }
        catch (error) {
            console.error('Error fetching laborants:', error);
        }
    };
    const fetchLaborantDetails = async (laborantId) => {
        try {
            const { data } = await axios.get(`http://localhost:8080/laborants/${laborantId}`);
            return data;
        }
        catch (error) {
            console.error('Error fetching laborant details:', error);
            return null;
        }
    };
    useEffect(() => {
        // userRole bilgisini localStorage'dan okuma
        const role = localStorage.getItem('userRole');
        setUserRole(role);
        fetchData();
        fetchLaborants();
        console.log(userRole);
    }, []);
    const handleView = (report) => {
        setSelectedReport(report);
        setIsViewModalOpen(true);
    };
    const handleEdit = (report) => {
        setSelectedReport(report);
        setUpdatedReport({ ...report });
        setDiagnosisDate(new Date(report.diagnosisDate));
        setIsEditModalOpen(true);
    };
    const handleUpdate = async () => {
        try {
            let newFilePath = updatedReport.reportImagePath; // Var olan resim yolunu koruyun
            if (file) {
                // Önce dosyayı yükle
                const formData = new FormData();
                formData.append('file', file);
                console.log(file.name);
                const response = await axios.post(`http://localhost:8080/reports/${selectedReport.id}/upload`, formData);
                // Sunucudan dönen yeni dosya yolunu alın
                newFilePath = `/uploads/${updatedReport.id}_${file.name}`; // Sunucudan gelen yeni dosya yolu
                selectedReport.reportImagePath = newFilePath;
                console.log(selectedReport.reportImagePath);
            }
            // Güncellenmiş rapor verilerini kaydedin
            updatedReport.reportImagePath = newFilePath;
            updatedReport.diagnosisDate = diagnosisDate.toISOString().split('T')[0]; // Tarihi ISO string'e dönüştür
            await axios.put(`http://localhost:8080/reports/${updatedReport.id}`, updatedReport);
            fetchData();
            setIsEditModalOpen(false);
        }
        catch (error) {
            console.error("Error updating report:", error);
        }
    };
    const handleDelete = async (reportId) => {
        try {
            await axios.delete(`http://localhost:8080/reports/${reportId}`);
            fetchData();
        }
        catch (error) {
            console.error("Error deleting report:", error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedReport((prev) => ({ ...prev, [name]: value }));
    };
    const rows = reports.map((report) => (_jsxs(Table.Tr, { children: [_jsx(Table.Td, { children: report.patientFirstName }), _jsx(Table.Td, { children: report.patientLastName }), _jsx(Table.Td, { children: report.patientId }), _jsx(Table.Td, { children: report.laborant.firstName }), _jsx(Table.Td, { children: report.laborant.lastName }), _jsx(Table.Td, { children: _jsxs(Group, { children: [_jsx(Button, { size: "xs", onClick: () => handleView(report), variant: "secondary", children: "View" }), _jsx(Button, { size: "xs", onClick: () => handleEdit(report), variant: "primary", children: "Edit" }), userRole === 'admin' && (_jsx(Button, { size: "xs", onClick: () => handleDelete(report.id), variant: "danger", children: "Delete" }))] }) })] }, report.id)));
    return (_jsxs(MantineProvider, { theme: theme, children: [_jsxs(Table, { children: [_jsx(Table.Thead, { children: _jsxs(Table.Tr, { children: [_jsx(Table.Th, { children: "Patient Name" }), _jsx(Table.Th, { children: "Patient Surname" }), _jsx(Table.Th, { children: "Patient ID" }), _jsx(Table.Th, { children: "Laborant Name" }), _jsx(Table.Th, { children: "Laborant Surname" }), _jsx(Table.Th, { children: "Action" })] }) }), _jsx(Table.Tbody, { children: rows })] }), _jsx(Modal, { opened: isViewModalOpen, onClose: () => setIsViewModalOpen(false), title: "View Report", children: selectedReport && (_jsxs(_Fragment, { children: [_jsx(TextInput, { label: "File Number", value: selectedReport.fileNumber, readOnly: true }), _jsx(TextInput, { label: "Patient First Name", value: selectedReport.patientFirstName, readOnly: true }), _jsx(TextInput, { label: "Patient Last Name", value: selectedReport.patientLastName, readOnly: true }), _jsx(TextInput, { label: "Patient ID", value: selectedReport.patientId, readOnly: true }), _jsx(TextInput, { label: "Diagnosis Title", value: selectedReport.diagnosisTitle, readOnly: true }), _jsx(TextInput, { label: "Diagnosis Details", value: selectedReport.diagnosisDetails, readOnly: true }), _jsx(TextInput, { label: "Laborant Name Surname", value: `${selectedReport.laborant.firstName} ${selectedReport.laborant.lastName}`, readOnly: true }), _jsx("h3", { children: "Report Image" }), _jsx("img", { src: `http://localhost:8080${selectedReport.reportImagePath}`, alt: "Report", style: { width: '100%', height: 'auto', marginTop: '20px' } }), _jsx(TextInput, { label: "Diagnosis Date", value: new Date(selectedReport.diagnosisDate).toLocaleDateString('en-GB'), readOnly: true })] })) }), _jsx(Modal, { opened: isEditModalOpen, onClose: () => setIsEditModalOpen(false), title: "Edit Report", children: selectedReport && (_jsxs(_Fragment, { children: [_jsx(TextInput, { label: "File Number", name: "fileNumber", value: updatedReport.fileNumber || '', onChange: handleInputChange }), _jsx(TextInput, { label: "Patient First Name", name: "patientFirstName", value: updatedReport.patientFirstName || '', onChange: handleInputChange }), _jsx(TextInput, { label: "Patient Last Name", name: "patientLastName", value: updatedReport.patientLastName || '', onChange: handleInputChange }), _jsx(TextInput, { label: "Patient ID", name: "patientId", value: updatedReport.patientId || '', onChange: handleInputChange }), _jsx(TextInput, { label: "Diagnosis Title", name: "diagnosisTitle", value: updatedReport.diagnosisTitle || '', onChange: handleInputChange }), _jsx(TextInput, { label: "Diagnosis Details", name: "diagnosisDetails", value: updatedReport.diagnosisDetails || '', onChange: handleInputChange }), _jsx(Select, { label: "Laborant", name: "laborantId", value: updatedReport.laborantId?.toString() || '', onChange: handleLaborantChange, data: laborants }), _jsx(FileInput, { label: "Upload New Image", onChange: (e) => setFile(e) }), _jsx(Button, { onClick: handleUpdate, variant: "primary", children: "Update" })] })) })] }));
}
export default ReportsTable;
