import { Job } from '../decorators/job.decorator';
import { AbstractJob } from './abstract.job';

@Job({
  name: 'Fibonacci',
  description: 'Generate a Fibonacci squence and store it in the DB.',
})
export class FibonacciJob extends AbstractJob {}
