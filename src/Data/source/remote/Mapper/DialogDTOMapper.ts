import { IDTOMapper } from './IDTOMapper';
import { RemoteDialogDTO } from '../../../dto/dialog/RemoteDialogDTO';
import { DialogType } from '../../../../Domain/entity/DialogTypes';
import {
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
  INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
  MapperDTOException,
  UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE,
  UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE,
} from '../../exception/MapperDTOException';

type DtoValidator<T> = {
  [key in keyof T]: (v: unknown) => v is T[key];
};

export class DialogDTOMapper implements IDTOMapper {
  private readonly currentUserId: number;

  constructor(currentUserId: number) {
    this.currentUserId = currentUserId;
  }

  // eslint-disable-next-line class-methods-use-this
  fromDTO<TArg, TResult>(dto: TArg): Promise<TResult> {
    const dialogDTO: RemoteDialogDTO = dto as unknown as RemoteDialogDTO;

    DialogDTOMapper.validateDTO(dialogDTO);

    const dialog: QBChatDialog = {
      _id: dialogDTO.id,
      created_at: '',
      last_message: dialogDTO.lastMessageText,
      last_message_date_sent: dialogDTO.lastMessageDateSent,
      last_message_id: null,
      last_message_user_id: parseInt(dialogDTO.lastMessageUserId, 10),
      name: dialogDTO.name,
      occupants_ids: dialogDTO.participantsIds,
      new_occupants_ids: dialogDTO.newParticipantsIds
        ? dialogDTO.newParticipantsIds
        : [],
      photo: dialogDTO.photo !== '' ? dialogDTO.photo : null,
      type: dialogDTO.type as QBChatDialogType,
      unread_messages_count: dialogDTO.unreadMessageCount,
      updated_at: dialogDTO.updatedAt,
      user_id: parseInt(dialogDTO.ownerId, 10),
      xmpp_room_jid: null,
    };

    return Promise.resolve(dialog as TResult);
  }

  // eslint-disable-next-line class-methods-use-this
  toTDO<TArg, TResult>(qbEntity: TArg): Promise<TResult> {
    const qbDialog: QBChatDialog = qbEntity as unknown as QBChatDialog;

    DialogDTOMapper.validateQBChatDialog(qbDialog);

    const dto: RemoteDialogDTO = new RemoteDialogDTO();

    dto.id = qbDialog._id;
    dto.lastMessageId = qbDialog.last_message_id || '';
    dto.lastMessageText = qbDialog.last_message as string;
    dto.lastMessageDateSent = qbDialog.last_message_date_sent as string;
    // dto.lastMessageDateSent = (
    //   parseInt(qbDialog.last_message_date_sent || '0', 10) * 1000
    // ).toString();
    dto.lastMessageUserId =
      qbDialog.last_message_user_id === null
        ? ''
        : qbDialog.last_message_user_id.toString();
    dto.ownerId = qbDialog.user_id.toString();
    dto.type = qbDialog.type as number;
    dto.unreadMessageCount =
      qbDialog.unread_messages_count === null
        ? 0
        : qbDialog.unread_messages_count;
    dto.updatedAt = qbDialog.updated_at;
    dto.participantId = qbDialog.user_id.toString();
    dto.name = qbDialog.name;
    dto.photo = qbDialog.photo === null ? '' : qbDialog.photo;
    dto.participantsIds = qbDialog.occupants_ids;
    dto.newParticipantsIds = qbDialog.new_occupants_ids;

    switch (qbDialog.type) {
      case DialogType.private:
        // eslint-disable-next-line no-case-declarations
        const interlocutorId = dto.participantsIds.find(
          (p) => p !== this.currentUserId,
        ); // ;

        dto.participantId = interlocutorId
          ? interlocutorId.toString()
          : qbDialog.user_id.toString();
        dto.id = qbDialog._id;
        dto.lastMessageText = qbDialog.last_message as string;
        dto.lastMessageDateSent = qbDialog.last_message_date_sent as string;
        dto.lastMessageUserId =
          qbDialog.last_message_user_id === null
            ? ''
            : qbDialog.last_message_user_id.toString();
        dto.ownerId = qbDialog.user_id.toString();
        dto.type = qbDialog.type;
        dto.unreadMessageCount =
          qbDialog.unread_messages_count === null
            ? 0
            : qbDialog.unread_messages_count;
        dto.updatedAt = qbDialog.updated_at;
        break;
      case DialogType.public:
        dto.id = qbDialog._id;
        dto.lastMessageText = qbDialog.last_message as string;
        dto.lastMessageDateSent = qbDialog.last_message_date_sent as string;
        dto.lastMessageUserId =
          qbDialog.last_message_user_id === null
            ? ''
            : qbDialog.last_message_user_id.toString();
        dto.ownerId = qbDialog.user_id.toString();
        dto.type = qbDialog.type;
        dto.unreadMessageCount =
          qbDialog.unread_messages_count === null
            ? 0
            : qbDialog.unread_messages_count;
        dto.updatedAt = qbDialog.updated_at;
        dto.participantId = qbDialog.user_id.toString();
        dto.name = qbDialog.name;
        dto.photo = qbDialog.photo === null ? '' : qbDialog.photo;
        break;
      case DialogType.group:
        dto.id = qbDialog._id;
        dto.lastMessageText = qbDialog.last_message as string;
        dto.lastMessageDateSent = qbDialog.last_message_date_sent as string;
        dto.lastMessageUserId =
          qbDialog.last_message_user_id === null
            ? ''
            : qbDialog.last_message_user_id.toString();
        dto.ownerId = qbDialog.user_id.toString();
        dto.type = qbDialog.type;
        dto.unreadMessageCount =
          qbDialog.unread_messages_count === null
            ? 0
            : qbDialog.unread_messages_count;
        dto.updatedAt = qbDialog.updated_at;
        dto.name = qbDialog.name;
        dto.photo = qbDialog.photo === null ? '' : qbDialog.photo;
        dto.participantsIds = qbDialog.occupants_ids;
        break;
      default:
        return Promise.reject(
          new MapperDTOException(
            UNEXPECTED_MAPPER_DTO_EXCEPTION_MESSAGE,
            UNEXPECTED_MAPPER_DTO_EXCEPTION_EXCEPTION_CODE,
            'undefinded type dialog in QBChatDialog',
          ),
        );
    }

    return Promise.resolve(dto as unknown as TResult);
  }

  // TODO: check field for validate RemoteDialogDTO
  private static validateDTO(dto: RemoteDialogDTO) {
    const dialogDTOValidator: DtoValidator<RemoteDialogDTO> = {
      id(v: unknown): v is RemoteDialogDTO['id'] {
        const { id } = v as RemoteDialogDTO;

        return id !== undefined && id !== null;
      },
      lastMessageDateSent(
        v: unknown,
      ): v is RemoteDialogDTO['lastMessageDateSent'] {
        const { lastMessageDateSent } = v as RemoteDialogDTO;

        return (
          lastMessageDateSent !== undefined && lastMessageDateSent !== null
        );
      },
      lastMessageText(v: unknown): v is RemoteDialogDTO['lastMessageText'] {
        const { lastMessageText } = v as RemoteDialogDTO;

        return lastMessageText !== undefined && lastMessageText !== null;
      },
      lastMessageUserId(v: unknown): v is RemoteDialogDTO['lastMessageUserId'] {
        const { lastMessageUserId } = v as RemoteDialogDTO;

        return lastMessageUserId !== undefined && lastMessageUserId !== null;
      },
      lastMessageId(v: unknown): v is RemoteDialogDTO['lastMessageId'] {
        const { lastMessageId } = v as RemoteDialogDTO;

        return lastMessageId !== undefined && lastMessageId !== null;
      },
      name(v: unknown): v is RemoteDialogDTO['name'] {
        const { name } = v as RemoteDialogDTO;

        return name !== undefined && name !== null;
      },
      ownerId(v: unknown): v is RemoteDialogDTO['ownerId'] {
        const { ownerId } = v as RemoteDialogDTO;

        // todo: need check to empty string or string with len <= 3
        return ownerId !== undefined && ownerId !== null;
      },
      participantId(v: unknown): v is RemoteDialogDTO['participantId'] {
        const { participantId } = v as RemoteDialogDTO;

        return participantId !== undefined && participantId !== null;
      },
      participantsIds(v: unknown): v is RemoteDialogDTO['participantsIds'] {
        const { participantsIds } = v as RemoteDialogDTO;

        return participantsIds !== undefined && participantsIds !== null;
      },
      photo(v: unknown): v is RemoteDialogDTO['photo'] {
        const { photo } = v as RemoteDialogDTO;

        return photo !== undefined && photo !== null;
      },
      type(v: unknown): v is RemoteDialogDTO['type'] {
        const { type } = v as RemoteDialogDTO;

        return type !== undefined && type !== null;
      },
      unreadMessageCount(
        v: unknown,
      ): v is RemoteDialogDTO['unreadMessageCount'] {
        const { unreadMessageCount } = v as RemoteDialogDTO;

        return unreadMessageCount !== undefined && unreadMessageCount !== null;
      },
      updatedAt(v: unknown): v is RemoteDialogDTO['updatedAt'] {
        const { updatedAt } = v as RemoteDialogDTO;

        return updatedAt !== undefined && updatedAt !== null;
      },
    };

    if (!dialogDTOValidator.id(dto))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exist or empty',
      );
    if (!dialogDTOValidator.lastMessageText(dto))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {lastMessage} does not exist or empty',
      );
    if (!dialogDTOValidator.ownerId(dto))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {ownerId} does not exist or empty',
      );
    if (!dialogDTOValidator.type(dto))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {type} does not exist or empty',
      );
    if (!dialogDTOValidator.unreadMessageCount(dto))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {unreadMessageCount} does not exist or empty',
      );
    if (!dialogDTOValidator.updatedAt(dto))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {updatedAt} does not exist or empty',
      );
    if (!dialogDTOValidator.name(dto))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {name} does not exist or empty',
      );
    if (!dialogDTOValidator.photo(dto))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {photo} does not exist or empty',
      );
  }

  // TODO: check field for validate QBChatDialog
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static validateQBChatDialog(qbDialog: QBChatDialog) {
    const qbDialogValidator: DtoValidator<QBChatDialog> = {
      _id(v: unknown): v is QBChatDialog['_id'] {
        const { _id } = v as QBChatDialog;

        return _id !== undefined && _id !== null;
      },
      created_at(v: unknown): v is QBChatDialog['created_at'] {
        const { created_at } = v as QBChatDialog;

        return created_at !== undefined && created_at !== null;
      },
      data(v: unknown): v is QBChatDialog['data'] {
        const { data } = v as QBChatDialog;

        return data !== undefined && data !== null;
      },
      joined(v: unknown): v is QBChatDialog['joined'] {
        const { joined } = v as QBChatDialog;

        return joined !== undefined && joined !== null;
      },
      last_message(v: unknown): v is QBChatDialog['last_message'] {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { last_message } = v as QBChatDialog;

        // return last_message !== undefined && last_message !== null;
        return true;
      },
      last_message_date_sent(
        v: unknown,
      ): v is QBChatDialog['last_message_date_sent'] {
        const { last_message_date_sent } = v as QBChatDialog;

        return (
          last_message_date_sent !== undefined &&
          last_message_date_sent !== null
        );
      },
      last_message_id(v: unknown): v is QBChatDialog['last_message_id'] {
        const { last_message_id } = v as QBChatDialog;

        return last_message_id !== undefined && last_message_id !== null;
      },
      last_message_user_id(
        v: unknown,
      ): v is QBChatDialog['last_message_user_id'] {
        const { last_message_user_id } = v as QBChatDialog;

        return (
          last_message_user_id !== undefined && last_message_user_id !== null
        );
      },
      name(v: unknown): v is QBChatDialog['name'] {
        const { name } = v as QBChatDialog;

        return name !== undefined && name !== null;
      },
      occupants_ids(v: unknown): v is QBChatDialog['occupants_ids'] {
        const { occupants_ids } = v as QBChatDialog;

        return occupants_ids !== undefined && occupants_ids !== null;
      },
      new_occupants_ids(v: unknown): v is QBChatDialog['new_occupants_ids'] {
        const { new_occupants_ids } = v as QBChatDialog;

        return new_occupants_ids !== undefined && new_occupants_ids !== null;
      },
      photo(v: unknown): v is QBChatDialog['photo'] {
        const { photo } = v as QBChatDialog;

        return photo !== undefined && photo !== null;
      },
      type(v: unknown): v is QBChatDialog['type'] {
        const { type } = v as QBChatDialog;

        return type !== undefined && type !== null;
      },
      unread_messages_count(
        v: unknown,
      ): v is QBChatDialog['unread_messages_count'] {
        const { unread_messages_count } = v as QBChatDialog;

        return (
          unread_messages_count !== undefined && unread_messages_count !== null
        );
      },
      updated_at(v: unknown): v is QBChatDialog['updated_at'] {
        const { updated_at } = v as QBChatDialog;

        return updated_at !== undefined && updated_at !== null;
      },
      user_id(v: unknown): v is QBChatDialog['user_id'] {
        const { user_id } = v as QBChatDialog;

        return user_id !== undefined && user_id !== null;
      },
      xmpp_room_jid(v: unknown): v is QBChatDialog['xmpp_room_jid'] {
        const { xmpp_room_jid } = v as QBChatDialog;

        return xmpp_room_jid !== undefined && xmpp_room_jid !== null;
      },
    };

    if (!qbDialogValidator._id(qbDialog))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {id} does not exist or empty',
      );
    if (!qbDialogValidator.last_message(qbDialog)) {
      console.log(
        'last_message is does not exist or empty. qbDialog: ',
        JSON.stringify(qbDialog),
      );
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {lastMessage} does not exist or empty',
      );
    }

    if (!qbDialogValidator.user_id(qbDialog))
      throw new MapperDTOException(
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_MESSAGE,
        INCORRECT_DATA_MAPPER_DTO_EXCEPTION_CODE,
        'field {user_id} does not exist or empty',
      );
  }
}
