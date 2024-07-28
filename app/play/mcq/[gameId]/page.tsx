import MCQ from '@/components/MCQ';
import React from 'react';

type Props = {
    gameId: string;
}

const MCQGamePage = ({ params }: {params : Props}) => {
    console.log("gameId________________",params.gameId)
    return (
        <div className='mt-32 text-white'>
            <MCQ  gameId = {params.gameId}/>
            <h1>
            </h1>
        </div>
    );
};

export default MCQGamePage;