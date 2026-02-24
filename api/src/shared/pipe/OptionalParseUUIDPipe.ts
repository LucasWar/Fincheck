import { PipeTransform, ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';

export class OptionalParseUUIDPipe implements PipeTransform {
  private readonly uuidPipe = new ParseUUIDPipe();

  async transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): Promise<string | undefined> {
    if (typeof value === 'undefined') {
      return undefined;
    }

    return this.uuidPipe.transform(value, metadata);
  }
}
