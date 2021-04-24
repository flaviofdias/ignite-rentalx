import { inject, injectable } from "tsyringe";

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
  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists = this.specificationsRespository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists");
    }

    this.specificationsRespository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
