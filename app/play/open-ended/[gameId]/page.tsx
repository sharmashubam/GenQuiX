import OpenEnded from '@/components/OpenEnded';
import React from 'react';

type Props = {
    gameId : string
}
const OpenEndedGamePage = ({params}: {params :Props}) => {

  return (
    <div className='mt-32'>
      <OpenEnded gameId= {params.gameId}/>
    </div>
  );
};

export default OpenEndedGamePage;
