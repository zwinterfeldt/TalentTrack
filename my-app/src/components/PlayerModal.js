import React, { useState } from 'react';
import styles from './PlayerModal.module.css';

const PlayerModal = ({ player, isAddingPlayer, onClose, onSave, onAdd }) => {
   const defaultPlayer = {
    name: '',          
    highSchool: '',    
    gpa: '',           
    clubTeam: '',      
    position: '',      
    gradYear: '',      
    state: '',         
    lastGame: '',      
    email: ''         
};


    const [editablePlayer, setEditablePlayer] = useState(
        isAddingPlayer ? defaultPlayer : { ...player }
    );
    const [isEditMode, setIsEditMode] = useState(isAddingPlayer); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditablePlayer({ ...editablePlayer, [name]: value });
    };

    const handleSave = () => {
        if (isAddingPlayer) {
            onAdd(editablePlayer); // Add new player
        } else {
            onSave(editablePlayer); // Save updates
        }
        setIsEditMode(false); // Exit edit mode
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                <h2>{isAddingPlayer ? 'Add New Player' : 'Player Details'}</h2>

                {/* Render all fields */}
                {Object.keys(editablePlayer).map((key) => (
                    <div key={key} className={styles.formGroup}>
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        {isEditMode ? (
                            <input
                                name={key}
                                value={editablePlayer[key]}
                                onChange={handleChange}
                                placeholder={`Enter ${key}`}
                            />
                        ) : (
                            <p>{editablePlayer[key] || 'N/A'}</p>
                        )}
                    </div>
                ))}

                <div className={styles.buttonGroup}>
                    {isEditMode ? (
                        <>
                            <button onClick={handleSave}>
                                {isAddingPlayer ? 'Add Player' : 'Save'}
                            </button>
                            {!isAddingPlayer && (
                                <button
                                    onClick={() => {
                                        setEditablePlayer({ ...player }); // Reset changes
                                        setIsEditMode(false);
                                    }}
                                    className={styles.cancelButton}
                                >
                                    Cancel
                                </button>
                            )}
                        </>
                    ) : (
                        <button onClick={() => setIsEditMode(true)}>Edit</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlayerModal;
