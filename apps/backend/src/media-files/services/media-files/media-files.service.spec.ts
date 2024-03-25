import { Test, TestingModule } from '@nestjs/testing';
import { MediaFilesService } from './media-files.service';

describe('MediaFilesService', () => {
  let service: MediaFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaFilesService],
    }).compile();

    service = module.get<MediaFilesService>(MediaFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
