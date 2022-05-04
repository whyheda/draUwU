import React from 'react';
import { ColorContext } from '../context';

interface Props {
  colors: string[],
  undo: () => void,
  redo: () => void
}

function Header(props: Props) {

  const { setColor } = React.useContext(ColorContext);

  return (
    <div className='absolute flex space-x-6 pt-3 pb-1 justify-between content-center left-1/2 mt-4 backdrop-blur-md border px-4 rounded-lg -translate-x-1/2'>

      <button
        className='rounded-md px-3 h-10 bg-slate-100 text-slate-600'
        children={'1003904955'}
      />

      <div className='space-x-1 flex-col'>
        {props.colors.map((color, i) => (
          <button
            key={i}
            onClick={() => setColor(color)}
            className='rounded-full w-10 h-10'
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className='space-x-2 flex-col'>
        <button onClick={props.undo} className='rounded-md w-10 h-10 bg-slate-100' />
        <button className='rounded-md w-10 h-10 bg-slate-100' />
      </div>

    </div>
  )
}

export { Header }