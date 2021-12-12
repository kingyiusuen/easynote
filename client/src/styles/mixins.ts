import { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const baseButton = css`
  border: none;
  border-radius: 6px;

  &:hover {
    cursor: pointer;
  }
`;

export const baseIconButton = css`
  background: transparent;
  ${baseButton}
  ${flexCenter}
`;

export const truncatedText = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const scrollable = css`
  overflow: hidden auto;
  scrollbar-color: var(--scrollbar-thin-thumb) var(--scrollbar-thin-track);
  scrollbar-width: thin;

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-track {
    visibility: visible;
  }

  &:hover::-webkit-scrollbar,
  &:hover::-webkit-scrollbar-thumb,
  &:hover::-webkit-scrollbar-track {
    visibility: visible;
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thin-thumb);
  }

  &::-webkit-scrollbar-track {
    background-color: var(--scrollbar-thin-track);
    border-color: var(--scrollbar-thin-track);
  }
`;
