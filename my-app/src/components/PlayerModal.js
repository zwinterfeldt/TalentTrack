import React, { useState } from 'react';
import styles from './PlayerModal.module.css';

const PlayerModal = ({ player, isAddingPlayer, onClose, onSave, onAdd, onDelete }) => {
    const defaultPlayer = {
        first_name: '',
        last_name: '',
        player_position: '',
        stars: '',
        grad_year: '',
        state: '',
        last_game: '',
        gpa: '',
        jersey_number: '',    // New field for jersey number
        highlight_video: '',  // New field for highlight video
        profile_picture: ''   // New field for profile picture (Base64 or URL)
    };

    const [editablePlayer, setEditablePlayer] = useState(
        isAddingPlayer ? defaultPlayer : { ...player }
    );
    const [isEditMode, setIsEditMode] = useState(isAddingPlayer);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditablePlayer({ ...editablePlayer, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditablePlayer({ ...editablePlayer, profile_picture: reader.result }); // Save image as Base64
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (isAddingPlayer) {
            onAdd(editablePlayer);
        } else {
            onSave(editablePlayer);
        }
        setIsEditMode(false);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>

                {/* Profile Picture */}
                <div className={styles.profilePictureContainer}>
                    {editablePlayer.profile_picture ? (
                        <img
                            src={editablePlayer.profile_picture}
                            alt="Profile"
                            className={styles.profilePicture}
                        />
                    ) : (
                        <div className={styles.profilePicturePlaceholder}>
                            No Image
                        </div>
                    )}
                    {isEditMode && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className={styles.imageUploadInput}
                        />
                    )}
                </div>

                <h2>{isAddingPlayer ? 'Add New Player' : 'Player Details'}</h2>

                {/* Render all fields */}
                {Object.keys(editablePlayer).map((key) => (
                    key !== 'profile_picture' && (
                        <div key={key} className={styles.formGroup}>
                            <label>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}</label>
                            {isEditMode ? (
                                <input
                                    name={key}
                                    value={editablePlayer[key] || ''}
                                    onChange={handleChange}
                                    placeholder={`Enter ${key.replace('_', ' ')}`}
                                    type={key === 'highlight_video' ? 'url' : 'text'}
                                />
                            ) : (
                                <p>
                                    {key === 'highlight_video' ? (
                                        <a href={editablePlayer[key]} target="_blank" rel="noopener noreferrer">
                                            {editablePlayer[key] || 'N/A'}
                                        </a>
                                    ) : (
                                        editablePlayer[key] || 'N/A'
                                    )}
                                </p>
                            )}
                        </div>
                    )
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
                                        setEditablePlayer({ ...player });
                                        setIsEditMode(false);
                                    }}
                                    className={styles.cancelButton}
                                >
                                    Cancel
                                </button>
                            )}
                        </>
                    ) : (
                        <>
                            <button onClick={() => setIsEditMode(true)}>Edit</button>
                            <button
                                onClick={() => onDelete(player.player_id)}
                                className={styles.deleteButton}
                            >
                                Delete Player
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlayerModal;

