import React, { createContext, useContext, useState, useCallback, useMemo, useRef, useEffect } from 'react';

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState('');

  const [isCourseDetailOpen, setIsCourseDetailOpen] = useState(false);
  const [activeDetailCourse, setActiveDetailCourse] = useState(null);

  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const dismissToast = useCallback(() => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = null;
    setToast(null);
  }, []);

  const showToast = useCallback((message, type = 'success', duration = 4500) => {
    // Replace any in-flight toast and restart the timer, so a rapid second
    // toast doesn't get cut short by the first one's pending timeout.
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToast({ message, type, id: Date.now() });
    toastTimer.current = window.setTimeout(() => {
      setToast(null);
      toastTimer.current = null;
    }, duration);
  }, []);

  useEffect(() => () => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
  }, []);

  const openEnrollModal = useCallback((courseTitle = '') => {
    setSelectedCourseForEnroll(courseTitle);
    setIsCourseDetailOpen(false);
    setIsEnrollOpen(true);
  }, []);

  const closeEnrollModal = useCallback(() => setIsEnrollOpen(false), []);

  const openCourseDetail = useCallback((course) => {
    setActiveDetailCourse(course);
    setIsCourseDetailOpen(true);
  }, []);

  const closeCourseDetail = useCallback(() => setIsCourseDetailOpen(false), []);

  const value = useMemo(
    () => ({
      isEnrollOpen,
      selectedCourseForEnroll,
      openEnrollModal,
      closeEnrollModal,
      isCourseDetailOpen,
      activeDetailCourse,
      openCourseDetail,
      closeCourseDetail,
      toast,
      showToast,
      dismissToast,
    }),
    [
      isEnrollOpen,
      selectedCourseForEnroll,
      openEnrollModal,
      closeEnrollModal,
      isCourseDetailOpen,
      activeDetailCourse,
      openCourseDetail,
      closeCourseDetail,
      toast,
      showToast,
      dismissToast,
    ]
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  return context;
};
