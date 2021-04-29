import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationsRespository: ISpecificationRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRespository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists");
    }

    await this.specificationsRespository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
