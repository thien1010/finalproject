import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostLike } from './entities/post_like.entity';

@Injectable()
export class PostLikeService {
  constructor(
    @InjectRepository(PostLike)
    private postLikeRepository: Repository<PostLike>,
  ) {}

  async getPostLikes(postId: number): Promise<PostLike[]> {
    try {
      const postLikes = await this.postLikeRepository.find({
        where: { post_id: postId },
      });
      return postLikes;
    } catch (error) {
      throw new NotFoundException('Failed to retrieve post likes');
    }
  }
  async get(postId: number): Promise<PostLike[]> {
    try {
      const postLikes = await this.postLikeRepository.find({
        where: { post_id: postId },
      });
      return postLikes;
    } catch (error) {
      throw new NotFoundException('Failed to retrieve post likes');
    }
  }

  async createPostLike(userId: number, postId: number): Promise<PostLike> {
    try {
      const postLike = this.postLikeRepository.create({
        user_id: userId,
        post_id: postId,
      });
      await this.postLikeRepository.save(postLike);
      return postLike;
    } catch (error) {
      throw new NotFoundException('Failed to create post like');
    }
  }

  async deletePostLike(likeId: number) {
    try {
      const postLike = await this.postLikeRepository.findOne({
        where: { like_id: likeId },
      });

      if (!postLike) {
        throw new NotFoundException(`Post like with ID ${likeId} not found`);
      }
      await this.postLikeRepository.remove(postLike);
      return { message: 'Post like deleted successfully' };
    } catch (error) {
      throw new NotFoundException('Failed to delete post like');
    }
  }
  async getLikesByUserAndPost(
    userId: number,
    postId: number,
  ): Promise<PostLike[]> {
    try {
      const postLikes = await this.postLikeRepository.find({
        where: { user_id: userId, post_id: postId },
      });
      return postLikes;
    } catch (error) {
      throw new NotFoundException('Failed to retrieve post likes');
    }
  }
}
