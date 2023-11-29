// function renderCustomForm(payload, customFormId, preferences) {
//     let tempoWidgetCustomFormId = customFormId || String(Math.floor(Math.random() * 5000));

//     let formValues = {};

//     const handleInputChange = (e, name) => {
//         const { value } = e.target;
//         formValues[name] = value;
//     };

//     const handleSubmit = async () => {
//         // Implementa la lógica de envío aquí si es necesario
//         console.log(formValues);

//         // Limpia el formulario
//         formValues = {};
//     };

//     function capitalizeFirstLetter(string) {
//         console.log(string)
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }

//     const handleFileInput = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const base64Data = e.target.result;
//                 setFileData(base64Data);
//                 handleInputChange(elementData.name, base64Data);
//             };
//             reader.readAsDataURL(file);
//             console.log(formValues)
//         }
//     };

//     const renderFormFields = (formData) => {
//         return Object.keys(formData).map((key) => {
//             const elementData = formData[key];
//             const placeholder = elementData.default || elementData.name

//             if (elementData.type === 'select') {
//                 return (
//                     <div key={key}>
//                         <label className="tempo-widget-custom-form-label">{capitalizeFirstLetter(elementData.name)}</label>
//                         <div className={`tempo-widget-custom-form-buttons`}>
//                             <button
//                                 className={`tempo-widget-custom-form-button`}
//                                 data-value="Yes"
//                                 id={`custom-form-yes-button-${tempoWidgetCustomFormId}`}
//                                 onClick={() => handleInputChange({ target: { value: 'Yes' } }, elementData.name)}
//                             >
//                                 Yes
//                             </button>
//                             <button
//                                 className={`tempo-widget-custom-form-button`}
//                                 data-value="No"
//                                 id={`custom-form-no-button-${tempoWidgetCustomFormId}`}
//                                 onClick={() => handleInputChange({ target: { value: 'No' } }, elementData.name)}
//                             >
//                                 No
//                             </button>
//                         </div>
//                     </div>
//                 );
//             } else if (elementData.type === 'multiselect') {
//                 return (
//                     <div key={key}>
//                         <label className="tempo-widget-custom-form-label">{capitalizeFirstLetter(elementData.name)}</label>
//                         <div className={`tempo-widget-custom-form-buttons`}>
//                             {elementData.options.map((option) => (
//                                 <button
//                                     key={option}
//                                     className={`tempo-widget-custom-form-button`}
//                                     data-value={option}
//                                     id={`${key}_${elementData.name}_${option}`}
//                                     onClick={() => handleMultiselect(option, elementData.name)}
//                                 >
//                                     {option}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 );
//             } else if (elementData.type === 'str') {
//                 return (
//                     <div key={key}>
//                         <label className="tempo-widget-custom-form-label">{capitalizeFirstLetter(elementData.name)}</label>
//                         <input
//                             type="text"
//                             id={`tempo-widget-custom-form-${key}`}
//                             className={`tempo-widget-custom-form-input chatbotwidgetPlaceHolder type${elementData.name}-${tempoWidgetCustomFormId}`}
//                             placeholder={capitalizeFirstLetter(placeholder)}
//                             name={elementData.name}
//                             // value={formValues[elementData.name] || ''}
//                             onChange={(e) => handleInputChange(e, elementData.name)}
//                         />
//                     </div>
//                 );
//             } else if (elementData.type === 'date') {
//                 return (
//                     <div key={key}>
//                         <label className="tempo-widget-custom-form-label">{capitalizeFirstLetter(elementData.name)}</label>
//                         <input
//                             type="date"
//                             id={`tempo-widget-custom-form-${key}`}
//                             className={`tempo-widget-custom-form-input chatbotwidgetPlaceHolder type${elementData.name}`}
//                             placeholder={placeholder}
//                             name={elementData.name}
//                             value={formValues[elementData.name] || ''}
//                             onChange={(e) => handleInputChange(e, elementData.name)}
//                         />
//                     </div>
//                 );
//             } else if (elementData.type === 'file') {
//                 return (
//                     <div>
//                         <label className="tempo-widget-custom-form-label">{capitalizeFirstLetter(elementData.name)}</label>
//                         <input
//                             type="file"
//                             id={`tempo-widget-custom-form-${elementData.name}`}
//                             className={`tempo-widget-custom-form-inputfile chatbotwidgetPlaceHolder type${elementData.name}`}
//                             name={elementData.name}
//                             onChange={handleFileInput}
//                         />
//                     </div>
//                 );
//             }



//             return null;
//         });
//     };

//     const component = (
//         <div className="component_answer">
//             <img
//                 className="profile-photo_ChatBot"
//                 src={
//                     preferences.logo || "https://deflection.ai/bot.png"
//                 }
//                 alt="Profile Photo"
//                 width="35px"
//             />
//             <div className={`tempo-widget-custom-form ${tempoWidgetCustomFormId}`}>
//                 {renderFormFields(payload)}
//                 <div className="tempo-widget-custom-form-button-container">
//                     <button
//                         className={`tempo-widget-custom-form-submitbutton button-${tempoWidgetCustomFormId}`}
//                         onClick={handleSubmit}
//                     >
//                         Submit
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );

//     return component;
// }

// export default renderCustomForm