import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthAccessGuard } from "src/commons/auth/gql-auth.guard";
import { IContext } from "src/commons/type/context";
import { FridgesService } from "../fridges/fridges.service";
import { CreateFridgeFoodInput } from "./dto/createFridgeFood.input";
import { UpdateFridgeFoodInput } from "./dto/updateFridgeFood.input";
import { FridgeFood } from "./entities/fridgeFood.entity";
import { FridgeFoodsService } from "./fridgeFoods.service";

@Resolver()
export class FridgeFoodsResolver {
  constructor(
    private readonly fridgeFoodsService: FridgeFoodsService,
    private readonly fridgesService: FridgesService
  ){}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [FridgeFood])
  async fetchFridgeFoods(
    @Args('fridgeId') fridgeId: string, //
  ){
    return await this.fridgeFoodsService.findAll({fridgeId}) 
  }

  // 냉장고에 음식 등록하기
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => FridgeFood)
  createFridgeFood(
    @Args('fridgeFoodInput') fridgeFoodInput: CreateFridgeFoodInput,
    @Context() context: IContext
  ){
    const userId = context.req.user.id
    return this.fridgeFoodsService.createFood({fridgeFoodInput, userId})
  }

  // 음식 수정
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async updateFridgeFoods(
    @Context() context: IContext, 
    @Args('fridgeFoodId') fridgeFoodId: string,
    @Args('updateFridgeFoodInput') updateFridgeFoodInput: UpdateFridgeFoodInput
  ) {
    const userId = context.req.user.id
   
    await this.fridgeFoodsService.updateFood({updateFridgeFoodInput, userId, fridgeFoodId})
    return '수정완료'
  }

  // 음식 삭제
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteFridgeFood(
    @Args('foodId') id: string, //
    @Args('fridgeId') fridgeId: string,
    @Context() context: IContext
    ){
    const foodId = id
    const userId = context.req.user.id
    
    return await this.fridgeFoodsService.deleteFood({fridgeId, foodId, userId})
  }
}