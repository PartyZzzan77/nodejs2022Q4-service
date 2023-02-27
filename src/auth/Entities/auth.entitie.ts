import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty({
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTgxMDE1LWFiZjMtNGZhOC05NTRiLTlmMDkxZDNlNmU1NiIsImxvZ2luIjoiVEVTVF9MT0dJTiIsImlhdCI6MTY3NjMxOTA0MCwiZXhwIjoxNjc2MzIyNjQwfQ.-Z3rcLvk5-36MNaIlEIcqivGNQd03m97Uv0B1h_MKPs',
  })
  accessToken: string;

  @ApiProperty({
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTgxMDE1LWFiZjMtNGZhOC05NTRiLTlmMDkxZDNlNmU1NiIsImxvZ2luIjoiVEVTVF9MT0dJTiIsImlhdCI6MTY3NjMxOTA0MCwiZXhwIjoxNjc2MzIyNjQwfQ.-Z3rcLvk5-36MNaIlEIcqivGNQd03m97Uv0B1h_MKPs',
  })
  refreshToken: string;
}

export class Unauthorized {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: 'Unauthorized' })
  message: string;
}
