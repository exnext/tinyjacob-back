import { Injectable } from '@nestjs/common';

type probability = {
    country: {
        country_id: string,
        probability: number
    }[],
    name: string
}

@Injectable()
export class OldService {
    getHello(): string {
      return 'Hello World 123456!';
    }
  
    goodbye(par): void {
      console.log(`Goodbye ${par.name} id:${par.id}`)
    }
  
    async probabilityMessage(params): Promise<string> {
      const data = await fetch(`https://api.nationalize.io/?name=${params.name}`);
      const json: Promise<probability> = data.json();
  
      return `${params.name}, the probability of you living in ${new Intl.DisplayNames(['EN'], { type: 'region' }).of((await json).country[0].country_id)} is ${Math.round((await json).country[0].probability * 10000) / 100} %`;
    }
  
    bToKb(size) {
      return Math.round(size / 1024);
    }}
