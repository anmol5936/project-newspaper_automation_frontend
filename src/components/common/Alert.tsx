import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertProps {
  type: AlertType;
  message: string;
  className?: string;
}

const alertStyles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200'
};

const AlertIcon = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertCircle
};

export function Alert({ type, message, className = '' }: AlertProps) {
  const Icon = AlertIcon[type];
  
  return (
    <div className={`flex items-center p-4 border rounded-lg ${alertStyles[type]} ${className}`}>
      <Icon className="w-5 h-5 mr-3" />
      <span>{message}</span>
    </div>
  );
}