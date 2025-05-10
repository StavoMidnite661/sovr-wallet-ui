import React from 'react';

export default function ui/tabs() {
  return (
    
import React from 'react';

export function Tabs({ children }) {
  return <div>{children}</div>;
}

export function TabsList({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ children, value }) {
  return <button data-value={value}>{children}</button>;
}

export function TabsContent({ children, value }) {
  return <div data-content={value}>{children}</div>;
}

  );
}
