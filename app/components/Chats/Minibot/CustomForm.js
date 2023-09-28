import { postQuestion } from '@/app/API/components/Minibot';
import React, { useEffect, useState } from 'react'


const CustomForm = ({ payload, customFormId, preferences, conversation_id }) => {

    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [fileData, setFileData] = useState('');
    const [submited, setSubmited] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState({});

    useEffect(() => {
        setIsSubmitEnabled(isFormComplete());
    }, [formValues]);

    const handleInputChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Data = e.target.result;
                setFileData(base64Data);
                handleInputChange(elementData.name, base64Data);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleMultiselect = (option, elementName) => {
        console.log(formValues[elementName])
        const updatedSelectedOptions = { ...selectedOptions };

        updatedSelectedOptions[`${option}`] =
            !updatedSelectedOptions[`${option}`];

        setSelectedOptions(updatedSelectedOptions);

        handleInputChange(elementName, Object.keys(updatedSelectedOptions).filter(key => updatedSelectedOptions[key]));
    };

    const renderFormFields = (formData) => {
        return Object.keys(formData).map((key) => {
            const elementData = formData[key];
            const placeholder = elementData.default || elementData.name;

            if (elementData.type === 'select') {
                return (
                    <div key={key}>
                        <label className="tempo-widget-custom-form-label">{capitalizeFirstLetter(elementData.name)}</label>
                        <div className={`tempo-widget-custom-form-buttons`}>
                            <button
                                className={`${(formValues[elementData.name] === "Yes") ? "tempo-widget-custom-form-button-selected" : 'tempo-widget-custom-form-button'}`}
                                data-value="Yes"
                                id={`custom-form-yes-button-${key}`}
                                onClick={() => handleInputChange(elementData.name, 'Yes')}
                            >
                                Yes
                            </button>
                            <button
                                className={`${(formValues[elementData.name] === "No") ? "tempo-widget-custom-form-button-selected" : 'tempo-widget-custom-form-button'}`}
                                data-value="No"
                                id={`custom-form-no-button-${key}`}
                                onClick={() => handleInputChange(elementData.name, 'No')}
                            >
                                No
                            </button>
                        </div>
                    </div>
                );
            } else if (elementData.type === 'multiselect') {
                return (
                    <div key={key}>
                        <label className="tempo-widget-custom-form-label">{capitalizeFirstLetter(elementData.name)}</label>
                        <div className={`tempo-widget-custom-form-buttons`}>
                            {elementData.options.map((option) => (
                                <button
                                    key={option}
                                    className={`${(formValues[elementData.name]?.includes(option)) ? " tempo-widget-custom-form-button-selected" : "tempo-widget-custom-form-button"}`}
                                    data-value={option}
                                    id={`${key}_${elementData.name}_${option}`}
                                    onClick={() => handleMultiselect(option, elementData.name)}
                                    disabled={submited}

                                >
                                    {option}

                                </button>
                            ))}
                        </div>
                    </div>
                );
            } else if (elementData.type === 'str') {
                return (
                    <div key={key}>
                        <label className="tempo-widget-custom-form-label">
                            {capitalizeFirstLetter(elementData.name)}
                        </label>
                        <input
                            type="text"
                            id={`tempo-widget-custom-form-${key}`}
                            className={`tempo-widget-custom-form-input chatbotwidgetPlaceHolder type${elementData.name}-${customFormId}`}
                            placeholder={capitalizeFirstLetter(placeholder)}
                            name={elementData.name}
                            value={formValues[elementData.name] || ''}
                            onChange={(e) => handleInputChange(elementData.name, e.target.value)}
                            disabled={submited}

                        />
                    </div>
                );
            } else if (elementData.type === 'date') {
                return (
                    <div key={key}>
                        <label className="tempo-widget-custom-form-label">{capitalizeFirstLetter(elementData.name)}</label>
                        <input
                            type="date"
                            id={`tempo-widget-custom-form-${key}`}
                            className={`tempo-widget-custom-form-input chatbotwidgetPlaceHolder type${elementData.name}`}
                            placeholder={placeholder}
                            name={elementData.name}
                            value={formValues[elementData.name] || ''}
                            onChange={(e) => handleInputChange(e, elementData.name)}
                            disabled={submited}

                        />
                    </div>
                );
            } else if (elementData.type === 'file') {
                return (
                    <div key={key}>
                        <label className="tempo-widget-custom-form-label">
                            {capitalizeFirstLetter(elementData.name)}
                        </label>
                        <input
                            type="file"
                            id={`tempo-widget-custom-form-${elementData.name}`}
                            className={`tempo-widget-custom-form-inputfile chatbotwidgetPlaceHolder type${elementData.name}`}
                            name={elementData.name}
                            onChange={handleFileInput}
                            disabled={submited}
                        />
                    </div>
                );
            }

            return null;
        });
    };

    const handleSubmit = async () => {
        console.log(formValues)
        // setSubmited(true)
        // let content = JSON.stringify(formValues)
        // let type = "FORM-RESPONSE"
        // await postQuestion(content, conversation_id, type)

        // setFormValues({});
    };


    const isFormComplete = () => {
        const requiredFields = Object.keys(payload).filter(
            (key) => payload[key].required
        );
        return requiredFields.every((field) => formValues[field]);
    };

    return (
        <div className="component_answer">
            <img
                className="profile-photo_ChatBot"
                src={preferences.logo || 'https://usetempo.ai/bot.png'}
                alt="Profile Photo"
                width="35px"
            />
            <div className={`tempo-widget-custom-form ${customFormId}`}>
                {renderFormFields(payload)}
                <div className="tempo-widget-custom-form-button-container">
                    <button
                        className={`tempo-widget-custom-form-submitbutton button-${customFormId} ${submited ? "bg-gray text-black" : "bg-primary text-white"}`}
                        onClick={handleSubmit}
                        disabled={submited}
                    >
                        {submited ? "Submited" : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CustomForm