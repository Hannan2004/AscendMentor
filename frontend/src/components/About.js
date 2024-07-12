import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const AboutSection = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-8">About Our Platform</h2>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="2010"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<i className="fas fa-code"></i>}
          >
            <h3 className="vertical-timeline-element-title">Skill Gap Analysis</h3>
            <p>
            Identify and understand your current skill gaps with our AI-powered chatbot. Receive personalized insights and recommendations tailored to your career goals.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="2010"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<i className="fas fa-code"></i>}
          >
            <h3 className="vertical-timeline-element-title">Learning Platform</h3>
            <p>
            Access a curated selection of learning resources and personalized study plans designed to enhance your skills and knowledge in your chosen field.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="2010"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<i className="fas fa-code"></i>}
          >
            <h3 className="vertical-timeline-element-title">Resume Review</h3>
            <p>
            Upload your resume for comprehensive feedback from our AI-driven review tool. Polish your resume and present yourself effectively to potential employers.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="2010"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<i className="fas fa-code"></i>}
          >
            <h3 className="vertical-timeline-element-title">Mock Interview Preparation</h3>
            <p>
            Practice and refine your interview skills with simulated interviews conducted by our virtual AI interviewer. Gain confidence and insight into your performance.
            </p>
          </VerticalTimelineElement>                              
          {/* Add more VerticalTimelineElement for each milestone */}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default AboutSection;
