import { BaseResult } from '@libs/shared/presenters/result.presenter';
import { BaseUseCase } from '@libs/shared/use-cases/base-use-case';

import { GetUsernameRecommendationDTO } from './get-username-recommendation.dto';

export class GetUsernameRecommendationUseCase extends BaseUseCase<
  GetUsernameRecommendationDTO,
  string[]
> {
  async execute(
    dto: GetUsernameRecommendationDTO,
  ): Promise<BaseResult<string[]>> {
    const firstWords = ['happy', 'sad', 'angry', 'excited', 'bored'];
    const secondWords = [
      'cat',
      'dog',
      'bird',
      'fish',
      'rabbit',
      'hamster',
      'turtle',
      'parrot',
      'ferret',
      'lizard',
      'snake',
      'chinchilla',
      'guinea_pig',
      'gerbil',
      'mouse',
      'rat',
      'frog',
      'toad',
      'salamander',
      'newt',
      'axolotl',
      'tarantula',
      'scorpion',
      'hermit_crab',
      'millipede',
    ];

    const alreadyRecommendedUsernames = dto.alreadyRecommendedUsernames || [];

    const recommendations = firstWords
      .map((firstWord) =>
        secondWords
          .filter(
            (secondWord) =>
              !alreadyRecommendedUsernames.includes(
                `${firstWord}_${secondWord}`,
              ),
          )
          .map((secondWord) => `${firstWord}_${secondWord}`),
      )
      .flat();

    return new BaseResult(recommendations);
  }
}
