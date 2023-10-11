import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';

export interface MultipleTextFieldProps {
    value: string[];
    prompt: string;
    labelSingular?: string;
    required?: boolean;
    variant?: "standard" | "filled" | "outlined";
    onChange: (values: string[]) => void;
    disabled?: boolean;
    min?: number;
    max?: number;
}

const MultipleTextField: FC<MultipleTextFieldProps> = ({ value, prompt, variant, labelSingular, required, onChange, disabled, max, min }) => {
    const [values, setValues] = useState<string[]>(value ?? ['']);

    useEffect(() => {
        setValues(value ?? ['']);
    }, [value]);

    const handleAddField = () => {
        setValues([...values, '']);
    }

    const handleRemoveField = (index: number) => {
        const newValues = values.filter((value, idx) => idx !== index)
        setValues(newValues);
        onChange(newValues);
    }

    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValues = [...values];
        newValues[index] = event.target.value;
        setValues(newValues);
        onChange(newValues);
    };

    return (
        <Box sx={{marginY: "1rem", width: '100%'}}>
            {values.map((value, index) => (
                <Box key={index} sx={{display: "flex", justifyContent: "center", marginY: "1rem"}} >
                    <TextField
                        required={required}
                        value={value}
                        variant={variant ?? "standard"}
                        onChange={(event) => handleChange(index, event)}
                        label={labelSingular ? labelSingular + " " + (index + 1): ''}
                        fullWidth
                        disabled={disabled}
                    />
                    {index === values.length - 1 && (
                        <IconButton color="primary" disabled={disabled || values.length === max} onClick={handleAddField}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    )}
                    {index > 0 && index === values.length - 1 && (
                        <IconButton color="secondary" disabled={disabled || values.length === min} onClick={() => handleRemoveField(index)}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            ))}
        </Box>
    );
}

export default MultipleTextField;