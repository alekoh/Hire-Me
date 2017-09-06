import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const advertisements = [
            {
              id: 1,
              name: 'Pride And Prejudice',
              city: 'Скопје',
              description: 1
            },
            {
              id: 2,
              name: 'Pride And Prejudice',
              city: 'Скопје',
              description: 1
            },
            {
              id: 3,
              name: 'Pride And Prejudice',
              city: 'Велес',
              description: 1
            },
            {
              id: 4,
              name: 'Pride And Prejudice',
              city: 'Битола',
              description: 1
            },
            {
              id: 5,
              name: 'Pride And Prejudice',
              city: 'Кочани',
              description: 1
            },
            {
              id: 6,
              name: 'Pride And Prejudice',
              city: 'Штип',
              description: 1
            },
            {
              id: 7,
              name: 'Pride And Prejudice',
              city: 'Охрид',
              description: 1
            },
            {
              id: 8,
              name: 'Pride And Prejudice',
              city: 'Кичево',
              description: 1
            },
            {
              id: 9,
              name: 'Pride And Prejudice',
              city: 'Тетово',
              description: 1
            },
            {
              id: 10,
              name: 'Pride And Prejudice',
              city: 'Струга',
              description: 1
            },
            {
              id: 11,
              name: 'Pride And Prejudice',
              city: 'Велес',
              description: 1
            },
            {
              id: 12,
              name: 'Pride And Prejudice',
              city: 'Струмица',
              description: 1
            },
            {
              id: 13,
              name: 'Pride And Prejudice',
              city: 'Кавадарци',
              description: 1
            },
            {
              id: 14,
              name: 'Pride And Prejudice',
              city: 'Прилеп',
              description: 1
            },
            {
              id: 15,
              name: 'Pride And Prejudice',
              city: 'Делчево',
              description: 1
            },
            {
              id: 16,
              name: 'Pride And Prejudice',
              city: 'Jane Austen',
              description: 1
            },
            {
              id: 17,
              name: 'Pride And Prejudice',
              city: 'Jane Austen',
              description: 1
            },
            {
              id: 18,
              name: 'Pride And Prejudice',
              city: 'Jane Austen',
              description: 1
            },
            {
              id: 19,
              name: 'Pride And Prejudice',
              city: 'Jane Austen',
              description: 1
            },
            {
              id: 20,
              name: 'Pride And Prejudice',
              city: 'Jane Austen',
              description: 1
            },
            {
              id: 21,
              name: 'Pride And Prejudice',
              city: 'Jane Austen',
              description: 1
            },
            {
              id: 22,
              name: 'Pride And Prejudice',
              city: 'Jane Austen',
              description: 1
            }

        ];
        return {advertisements};
    }
}
