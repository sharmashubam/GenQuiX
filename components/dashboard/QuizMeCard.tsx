"use client"
import React from "react";
import { Card } from 'antd';
import { useRouter } from "next/navigation";

type Props = {}

const QuizMeCard = (props: Props) =>{
    const router = useRouter();
    return (
        <div>
            <Card 
            onClick={()=>{
                router.push("/quiz")
            }} >
                <p>Quiz me</p>
                <p>
                Challenge yourself to a quiz with a topic of your choice. 
                </p>
            </Card>
        </div>
    )
}

export default QuizMeCard;