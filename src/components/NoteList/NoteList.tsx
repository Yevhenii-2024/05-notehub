import css from './NoteList.module.css';
import type { Note } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import  Loader  from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useState } from 'react';

interface NoteListProps {
	notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
	const [deletingNoteId, setDeletingNoteId] = useState<Note['id'] | null>(null);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (id: Note['id']) => deleteNote(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notes'] });
			setDeletingNoteId(null);
		},
		onError: () => {
			setDeletingNoteId(null);
		},
	});

	const { isError } = mutation;

	const handleDelete = (id: number) => {
		setDeletingNoteId(id);
		mutation.mutate(id);
	};

	return (
		<>
			<ul className={css.list}>
				{notes.map(note => {
					return (
						<li className={css.listItem} key={note.id}>
							<h2 className={css.title}>{note.title}</h2>
							<p className={css.content}>{note.content}</p>
							<div className={css.footer}>
								<span className={css.tag}>{note.tag}</span>
								<button
									className={css.button}
									onClick={() => handleDelete(note.id)}
									disabled={deletingNoteId === note.id}
								>
									{deletingNoteId !== note.id ? 'Delete' : 'In progress'}
									{deletingNoteId === note.id && <Loader />}
								</button>
							</div>
						</li>
					);
				})}
			</ul>

			{isError && <ErrorMessage />}
		</>
	);
}