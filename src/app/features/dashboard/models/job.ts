import { ICompensation } from './compensation';
import { IExperience } from './experience';
import { IJobLocation } from './job-location';
import { User } from '../../auth/models/user.model';
import { JobApplication } from './job-application';

export interface IJob {
  _id: string;
  createdBy: string;
  jobTitle: string;
  jobDescription: string;
  responsibilities: string;
  hiringManager: string;
  jobType: string;
  experience: IExperience;
  jobLocation: IJobLocation;
  workPlaceType: string;
  compensation: ICompensation;
  skills: string[];
  department: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  jobPosterInfo: User[];
  hiringManagerInfo: User[];
  applicants?: JobApplication[];
  isApplied?: boolean;
}
