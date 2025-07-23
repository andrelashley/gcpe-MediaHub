import React from 'react';
import { Button, Body2 } from '@fluentui/react-components';

interface SubmitButtonProps {
    /** Whether the button is in a loading/submitting state */
    isSubmitting?: boolean;
    /** Text to display when not submitting */
    defaultText?: string;
    /** Text to display when submitting */
    submittingText?: string;
    /** Click handler for the button */
    onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void;
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Button appearance */
    appearance?: 'primary' | 'secondary' | 'outline' | 'subtle' | 'transparent';
    /** Button size */
    size?: 'small' | 'medium' | 'large';
    /** Additional className for styling */
    className?: string;
    /** Button type attribute */
    type?: 'button' | 'submit' | 'reset';
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
    isSubmitting = false,
    defaultText = 'Save',
    submittingText = 'Saving...',
    onClick,
    disabled = false,
    appearance = 'primary',
    size = 'large',
    className,
    type = 'button',
}) => {
    return (
        <Button
            appearance={appearance}
            size={size}
            onClick={onClick}
            disabled={disabled || isSubmitting}
            className={className}
            type={type}
        >
            <Body2>{isSubmitting ? submittingText : defaultText}</Body2>
        </Button>
    );
};

export default SubmitButton;
