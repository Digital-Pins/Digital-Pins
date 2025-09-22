import React from 'react';

export default function Table({ children }: { children: React.ReactNode }){
  return (
    <div className="dp-table-wrap">
      <table className="dp-table">{children}</table>
    </div>
  )
}
