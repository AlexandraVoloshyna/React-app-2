import { Test, TestingModule } from "@nestjs/testing";
import { CardController } from "./card.controller";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
describe("CardController", () => {
  let controller: CardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardController],
      providers: [CardService],
    }).compile();

    controller = module.get<CardController>(CardController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a new card", async () => {
      const createCardDto: CreateCardDto = {
        title: "Sample Title",
        description: "Sample Description",
        dueDate: new Date("2024-04-08"),
        priority: "high",
        listId: "sampleListId123",
      };
      const result = await controller.create(createCardDto);
      expect(result).toEqual({
        message: "Card updated successfully",
        data: createCardDto,
      });
    });
  });
  describe("update", () => {
    it("should update a card", async () => {
      const updateCardDto: UpdateCardDto = {
        title: "Sample Title",
        description: "Sample Description",
        dueDate: new Date("2024-04-08"),
        priority: "high",
      };
      const id: string = "card id";
      const result = await controller.update(id, updateCardDto);
      expect(result).toEqual({
        message: "Card created successfully",
        data: updateCardDto,
      });
    });
  });
  describe("delete", () => {
    it("should delete a card", async () => {
      const id: string = "card id";
      const result = await controller.remove(id);
      expect(result).toEqual({
        message: "Card deleted successfully",
        data: [],
      });
    });
  });
});
