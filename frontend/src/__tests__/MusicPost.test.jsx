import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MusicPost from '../components/ProfilePage/MusicPost';
import '@testing-library/jest-dom';
import styles from '../components/ProfilePage/MusicPost.module.css';

describe('MusicPost', () => {
  const mockProps = {
    text: 'Check out this awesome song!',
    song: 'Happy Hearts',
    path: '../assets/Dirk Dehler - Happy Hearts.mp3'
  };

  it('renders post text and song title', () => {
    render(<MusicPost {...mockProps} />);
    
    expect(screen.getByText(mockProps.text)).toBeInTheDocument();
    expect(screen.getByText(`🎶 ${mockProps.song}`)).toBeInTheDocument();
  });

  it('renders audio player with correct source', () => {
    render(<MusicPost {...mockProps} />);
    
    const audioElement = screen.getByTestId('audio-player');
    expect(audioElement).toHaveAttribute('src', mockProps.path);
    expect(audioElement).toHaveAttribute('controls');
    expect(audioElement).toHaveAttribute('controlsList', 'noplaybackrate');
  });

  it('handles missing audio source gracefully', () => {
    const propsWithoutPath = {
      text: 'Post without audio',
      song: 'No Audio'
    };

    render(<MusicPost {...propsWithoutPath} />);
    
    expect(screen.getByText(propsWithoutPath.text)).toBeInTheDocument();
    expect(screen.getByText(`🎶 ${propsWithoutPath.song}`)).toBeInTheDocument();
    expect(screen.queryByTestId('audio-player')).not.toBeInTheDocument();
  });

  it('applies correct styling', () => {
    render(<MusicPost {...mockProps} />);
    
    // Get the post container
    const postText = screen.getByText(mockProps.text);
    const postContainer = postText.closest('div');
    
    // Check that elements have the correct CSS module classes
    expect(postContainer).toHaveClass(styles.postContainer);
    
    // Get the song embed
    const songText = screen.getByText(`🎶 ${mockProps.song}`);
    const songEmbed = songText.closest('div');
    
    expect(songEmbed).toHaveClass(styles.songEmbed);
  });
});